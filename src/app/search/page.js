'use client';
import React, { useEffect, useState, Suspense } from "react";
import Link from 'next/link';
import Image from 'next/image';
import Leftmenu from '../components/common/Sidebar/Leftmenu';
import { useSearchParams } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `https://npkohlercompaignapi.onrender.com/api/v1`;

function popupModal() {
    const modal = document.querySelector(".modelPopup1");
    if (modal) modal.classList.toggle("show-modal");
}

function SearchContent() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState([]);
    const [selectedAttribute, setSelectedAttribute] = useState({});
    const [hoveredAttribute, setHoveredAttribute] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const ProductTitle = searchParams.get('product-title') || '';  
    const ProductSKU = searchParams.get('product-sku') || '';
    const subsubcatName = searchParams.get('subsubcategory-name') || '';     

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = `${BASE_URL}/products?product_title=${ProductTitle}&subsubcategory.subsubcat_name=${subsubcatName}&attributes.sku=${ProductSKU}`;
                console.log('Fetching URL:', url);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched Data:', data);
    
                if (data.products.length === 0) {
                    setError("No matching products found.");
                } else {
                    setProducts(data.products || []);
                    setError(null); // Clear any previous errors
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, [ProductTitle, ProductSKU, subsubcatName]);  

    const handleAttributeChange = (productId, attribute) => {
        setSelectedAttribute(prevState => ({
            ...prevState,
            [productId]: attribute,
        }));
        setHoveredAttribute(prevState => ({
            ...prevState,
            [productId]: null, 
        }));
    };

    const handleMouseEnter = (productId, attribute) => {
        setHoveredAttribute(prevState => ({
            ...prevState,
            [productId]: attribute,
        }));
    };

    const handleMouseLeave = (productId) => {
        setHoveredAttribute(prevState => ({
            ...prevState,
            [productId]: null,
        }));
    };

    const getActiveAttribute = (productId) => {
        return hoveredAttribute[productId] || selectedAttribute[productId] || products.find(product => product._id === productId)?.attributes[0] || {};
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const renderMessage = () => {
        const product = products[0];
        const isSubsubcategoryMatch = product.subsubcategory?.subsubcat_name === subsubcatName;
        const isProductTitleMatch = product.product_title === ProductTitle;
        const isAttributeMatch = product.attributes?.find((att) => att.sku === ProductSKU)?.sku || "Product Attribute can not be found!";

        if (isSubsubcategoryMatch) {
            return subsubcatName;
        }
        if (isProductTitleMatch) {
            return ProductTitle;
        }
        if (isAttributeMatch !== "Product Attribute can not be found!") {
            return isAttributeMatch;
        }
    };

    return (
        <div className="right-section">
            {products.length > 0 ? (
                <div className="row">
                    {products.map((product, index) => {
                        const activeAttribute = getActiveAttribute(product._id);
                        return (
                            <div className="col-sm-4" key={index}>
                                <div className="product-box">
                                    <div className="image">
                                        <Image
                                            src={activeAttribute.single_img || '/default-image.jpg'} 
                                            alt={activeAttribute.title || 'Product Image'}
                                            width={400}
                                            height={400}
                                            priority
                                        />
                                    </div>
                                    <div className="info">
                                        <div className="tabs-color">
                                            {product.attributes.map((att, colorIndex) => (
                                                <span
                                                    className={`color ${att.color_name}`}
                                                    key={colorIndex}
                                                    onClick={() => handleAttributeChange(product._id, att)}
                                                    onMouseEnter={() => handleMouseEnter(product._id, att)}
                                                    onMouseLeave={() => handleMouseLeave(product._id)}
                                                    style={{
                                                        border: (hoveredAttribute[product._id] === att || selectedAttribute[product._id] === att)
                                                            ? '1px solid #000'
                                                            : 'none',
                                                    }}
                                                >
                                                    <Image
                                                        src={att.color_image || '/default-color-image.jpg'} 
                                                        alt={att.color || 'Color Image'}
                                                        width={30}
                                                        height={30}
                                                        priority
                                                    />
                                                </span>
                                            ))}
                                        </div>
                                        <h3>{product.product_title}</h3>
                                        <p>{activeAttribute.sku_subtitle}</p>
                                        <div className="pro-info">
                                            <p className="title">{activeAttribute.title}</p>
                                            <p className="sku" id="skuid">{activeAttribute.sku}</p>
                                        </div>
                                        <div className="btm-inquiry">
                                            <Link href="#" className="enqbtn" onClick={() => { popupModal() }}>Place an Enquiry</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : error ? (
                <div className="row">
                    <h1>{error}</h1>
                </div>
            ) : null}
        </div>
    );
}

export default function Page() {
    return (
        <main id="main">
            <div className="inner-page product-list">
                <div className="container-fluid">
                    <div className="breadcrumb">
                        <ul>
                            <li>
                                <Link href="/">Home</Link> <span>/</span>
                            </li>
                            <li>Search</li>
                        </ul>
                    </div>
                </div>
                <section className="top-section sectionbg1">    
                    <div className="container-fluid">
                        <div className="top-head">
                            <h2>Results not found</h2>
                        </div>
                    </div>
                </section>
                <section className="product-btm--01">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-3 left-side">
                                <div className="left-section">
                                    <Leftmenu />
                                </div>
                            </div>
                            <div className="col-sm-9 right-side">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <SearchContent />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </section>
                <br />
            </div>
        </main>
    );
}
