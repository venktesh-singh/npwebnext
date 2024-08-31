'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import Leftmenu from "../../../../components/common/Sidebar/Leftmenu"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://npkohlercompaignapi.onrender.com/api/v1';

function popupModal() {
  const modal = document.querySelector(".modelPopup1");
  modal.classList.toggle("show-modal");

  document.querySelectorAll('.place-an-enquiry').forEach(button => {
    button.addEventListener('click', function() {
      document.getElementById('sku_subtitle').value = this.getAttribute('data-pname');
      document.getElementById('sku').value = this.getAttribute('data-pmodel');
    });
  });
} 

export default function Page() {
  const pathname = usePathname();
  const [products, setProducts] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState({});
  const [hoveredAttribute, setHoveredAttribute] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathSegments = pathname.split('/').filter(Boolean);
  const category = pathSegments[1]; // /product/[category]/[subcategory]/[subsubcategory]
  const subcategory = pathSegments[2];
  const subsubcategory = pathSegments[3];

  useEffect(() => {
    if (category && subcategory && subsubcategory) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`${BASE_URL}/products/${category}/${subcategory}/${subsubcategory}`);
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
    }
  }, [category, subcategory, subsubcategory]);

  //if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

  const subsubcategoryName = products.map((checkSub) => checkSub.subsubcategory.subsubcat_name);  
  const subcategoryName = products.map((checkSub) => checkSub.subcategory.subcat_name);  
  const categoryName = products.map((checkcat) => checkcat.category.cat_name)
  console.log("Check Subsubcategory", products);
  return (
    <>
    
      <main id="main">
        <div className="inner-page product-list">
          <div className="container-fluid">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link href="/">Home</Link> <span>/</span>
                </li>
                
                <li>{ categoryName[0] } <span>/</span></li>
                <li>{ subcategoryName[0] } <span>/</span></li>
                <li>{ subsubcategoryName[0] }</li>
              </ul>
            </div>
          </div>
          <section className="top-section sectionbg1">
            <div className="container-fluid">
              <div className="top-head">
                <h2>{ subsubcategoryName[0] }</h2>
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
                                          src={activeAttribute.single_img}
                                          alt={activeAttribute.title}
                                          width={400}
                                          height={400}
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
                                                      src={att.color_image}
                                                      alt={att.color}
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
                                          <Link href="javascript:" className="enqbtn place-an-enquiry" data-pname={activeAttribute.sku_subtitle} data-pmodel={activeAttribute.sku} onClick={() => {popupModal()}}>Place an Enquiry</Link>
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