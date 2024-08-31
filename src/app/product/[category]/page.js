'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import Leftmenu from "../../components/common/Sidebar/Leftmenu";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import TopBar from "../../components/common/Search/Search";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://npkohlercompaignapi.onrender.com/api/v1';

export default function Page() {
  const pathname = usePathname();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract category from the path
  const pathSegments = pathname.split('/').filter(Boolean); // remove empty segments
  const category = pathSegments[1]; // assuming structure: /product/[category]
  console.log("Get Category", category);
  useEffect(() => {
    if (category) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`${BASE_URL}/products/${category}`);
          if (!response.ok) {
            console.error('Error fetching products:', response.statusText);
            throw new Error(`Server Error: ${response.status}`);
          }
          const data = await response.json();
          setProducts(data.products);
        } catch (error) {
          console.error('Error:', error.message);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
    <>
      <TopBar />
      <Header />
      <main id="main">
        <div className="inner-page product-list">
          <div className="container-fluid">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link href="/">Home</Link> <span>/</span>
                </li>
                <li>{category.charAt(0).toUpperCase() + category.slice(1)}</li>
              </ul>
            </div>
          </div>
          <section className="top-section sectionbg1">
            <div className="container-fluid">
              <div className="top-head">
                <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
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
                      {products.map((product) => (
                        <div className="col-sm-4" key={product._id}>
                          <div className="product-box">
                            <div className="image">
                              <Link href={`/products/${product._id}`}>
                                <Image 
                                  src={product.single_img || '/images/default.jpg'} 
                                  alt={product.product_title || 'Product Image'} 
                                  width={283} 
                                  height={212} 
                                  className="pro-image img-fluid" 
                                />
                              </Link>
                            </div>
                            <div className="info">
                              <h3>{product.product_title}</h3>
                              <p>{product.short_desc}</p>
                              <p>{product.attributes?.[0]?.sku}</p>
                              <div className="btm-inquiry">
                                <Link href="#" className="enqbtn">
                                  Place an Enquiry
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <br />
        </div>
      </main>
      <Footer />
    </>
  );
}
