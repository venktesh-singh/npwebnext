"use client"; // Add this at the top

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Leftmenu from '../components/common/Sidebar/Leftmenu';

// Skeleton Loader Component
const SkeletonLoader = () => {
    return (
        <div className="col-sm-4">
            <div className="product-box skeleton">
                <div className="image">
                    <div className="skeleton-img"></div>
                </div>
                <div className="info">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-subtitle"></div>
                    <div className="skeleton-sku"></div>
                    <div className="skeleton-inquiry"></div>
                </div>
            </div>
        </div>
    );
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://npkohlercompaignapi.onrender.com/api/v1';

export default function Page() {
    const [products, setProducts] = useState([]);
    const [selectedAttribute, setSelectedAttribute] = useState({});
    const [hoveredAttribute, setHoveredAttribute] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${BASE_URL}/products/`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

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
        return hoveredAttribute[productId] || selectedAttribute[productId] || products.find(product => product._id === productId).attributes[0];
    };

    const metaTitle = products.length ? `${products[0].product_title} - Rain Head` : 'Rain Head';
    const metaDescription = products.length ? `Check out the ${products[0].product_title} with modern design and exceptional power.` : 'Explore our Rain Head collection with modern design and innovation.';

    return (
        <>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
            </Head>
            <main id="main">
                <div className="inner-page product-list">
                    <div className="container-fluid">
                        <div className="breadcrumb">
                            <ul>
                                <li>
                                    <Link href="/">Home</Link> <span>/</span>
                                </li>
                                <li>Bathroom</li>
                            </ul>
                        </div>
                    </div>
                    <section className="top-section sectionbg1">
                        <div className="container-fluid">
                            <div className="top-head">
                                <h2>Rain Head</h2>
                            </div>
                            <div className="top-btmtext">
                                <p>Modern design meets exceptional power, innovation, and comfort.</p>
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
                                    <div className="right-section">
                                        <div className="row">
                                            {loading
                                                ? Array(6)
                                                    .fill(0)
                                                    .map((_, index) => <SkeletonLoader key={index} />)
                                                : products.map((product) => {
                                                    const activeAttribute = getActiveAttribute(product._id);
                                                    return (
                                                        <div className="col-sm-4" key={product._id}>
                                                            <div className="product-box">
                                                                <div className="image">
                                                                    <Image
                                                                        src={activeAttribute.single_img || '/images/default.jpg'}
                                                                        alt={activeAttribute.title || 'Product Image'}
                                                                        width={400}
                                                                        height={400}
                                                                    />
                                                                </div>
                                                                <div className="info">
                                                                    <div className="tabs-color">
                                                                        {product.attributes.map((att) => (
                                                                            <span
                                                                                className={`color ${att.color_name}`}
                                                                                key={att._id}
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
                                                                                    src={att.color_image || '/images/default-color.jpg'}
                                                                                    alt={att.color || 'Color Image'}
                                                                                    width={30}
                                                                                    height={30}
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
                                                                        <Link href="javascript:" className="enqbtn place-an-enquiry" data-pname={activeAttribute.sku_subtitle} data-pmodel={activeAttribute.sku} onClick={() => {popupModal()}}>Place an Enquiry Testing</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <br />
                </div>
            </main>
        </>
    );
}
