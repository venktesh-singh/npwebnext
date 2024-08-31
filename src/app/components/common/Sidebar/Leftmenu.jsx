'use client';
import React, { useEffect, useState } from "react";
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://npkohlercompaignapi.onrender.com/api/v1';

export default function Leftmenu() {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [subsubcategories, setSubsubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await fetch(`${BASE_URL}/categories`);
                const subcategoriesResponse = await fetch(`${BASE_URL}/subcategories`);
                const subsubcategoriesResponse = await fetch(`${BASE_URL}/subsubcategories`);

                if (!categoriesResponse.ok || !subcategoriesResponse.ok || !subsubcategoriesResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const categoriesData = await categoriesResponse.json();
                const subcategoriesData = await subcategoriesResponse.json();
                const subsubcategoriesData = await subsubcategoriesResponse.json();

                setCategories(categoriesData.category || []);
                setSubcategories(subcategoriesData.subcat || []);
                setSubsubcategories(subsubcategoriesData.subsubcat || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const groupedData = categories.reduce((acc, category) => {
        const categoryUrl = category.cat_url || '';
        acc[categoryUrl] = {};

        const relatedSubcategories = subcategories.filter(subcat => subcat.category.cat_url === categoryUrl);

        relatedSubcategories.forEach(subcat => {
            const subcatUrl = subcat.subcat_url || '';
            acc[categoryUrl][subcatUrl] = subsubcategories
                .filter(subsubcat => subsubcat.subcategory.subcat_url === subcatUrl)
                .map(subsubcat => ({
                    name: subsubcat.subsubcat_name || '',
                    url: subsubcat.subsubcat_url || ''
                }));
        });

        return acc;  
    }, {});
    const sscatURLs = subsubcategories?.map((checkUrl) => checkUrl.subsubcat_url) || [];
    
    return (
        <ul>
            {Object.entries(groupedData).map(([categoryUrl, subcats]) => (
                <li key={categoryUrl} className="outli">
                    <button>
                        {categories.find(category => category.cat_url === categoryUrl)?.cat_name || ''} <i className="bi bi-plus" />
                    </button>
                    <ul className="sub-filter">
                        {Object.entries(subcats).map(([subcatUrl, subsubcats]) => (
                            <li key={subcatUrl}>
                                <button>
                                    {subcategories.find(subcat => subcat.subcat_url === subcatUrl)?.subcat_name || ''} <i className="bi bi-plus" />
                                </button>
                                <ul className="sub-filter">
                                    {subsubcats.map(subsubcat => (
                                        <li key={subsubcat.url}>
                                            {subsubcat.url && sscatURLs.includes(subsubcat.url) ? (
                                                <Link href={`/product/${categoryUrl}/${subcatUrl}/${subsubcat.url}`}>
                                                    {subsubcat.name}
                                                </Link>
                                                ) : (
                                                <span>{subsubcat.name}</span> 
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}