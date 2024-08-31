'use client';
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import Leftmenu from '../components/common/Sidebar/Leftmenu';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `https://npkohlercompaignapi.onrender.com/api/v1`;

function popupModal(){
    var modal = document.querySelector(".modelPopup1");
    modal.classList.toggle("show-modal");
}

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

    const handleAttributeChange = (productId, attribute) => {
        setSelectedAttribute(prevState => ({
            ...prevState,
            [productId]: attribute,
        }));
        setHoveredAttribute(prevState => ({
            ...prevState,
            [productId]: null, // Clear hover state on click
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <main id="main">
            <div className="inner-page product-list">
                <div className="container-fluid">
                    <div className="breadcrumb">
                        <ul>
                            <li>
                                <Link href="/">Home</Link> <span>/</span>
                            </li>
                            <li>Product</li>
                        </ul>
                    </div>
                </div>
                <section className="top-section sectionbg1">
                    <div className="container-fluid">
                        <div className="top-head">
                            <h1>Product</h1>
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
                                        {products.map((product, index) => {
                                            const activeAttribute = getActiveAttribute(product._id);
                                            return (
                                                <div className="col-sm-4" key={index}>
                                                    <div className="product-box">
                                                        <div className="image">
                                                            <Image
                                                                src={activeAttribute.single_img || '/default-image.jpg'} // Ensure src is valid
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
                                                                            src={att.color_image || '/default-color-image.jpg'} // Ensure src is valid
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
                                                                <Link href="javascript:" className="enqbtn" onClick={() => {popupModal()}}>Place an Enquiry</Link>
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
    );
}