'use client';  // Add this line to indicate it's a Client Component

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://npkohlercompaignapi.onrender.com/api/v1';

function popupModal() {
  const modal = document.querySelector('.modelPopup1');
  modal.classList.toggle('show-modal');

  document.querySelectorAll('.place-an-enquiry').forEach((button) => {
    button.addEventListener('click', function () {
      document.getElementById('sku_subtitle').value = this.getAttribute('data-pname');
      document.getElementById('sku').value = this.getAttribute('data-pmodel');
    });
  });
}

const ClientComponent = ({ initialProducts }) => {
  const pathname = usePathname();
  const [products, setProducts] = useState(initialProducts || []); // Start with initial props
  const [selectedAttribute, setSelectedAttribute] = useState({});
  const [hoveredAttribute, setHoveredAttribute] = useState({});
  const [loading, setLoading] = useState(true);

  // Extract path segments for category, subcategory, subsubcategory
  const pathSegments = pathname.split('/').filter(Boolean);
  const category = pathSegments[1];
  const subcategory = pathSegments[2];
  const subsubcategory = pathSegments[3];

  useEffect(() => {
    const fetchNewProducts = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await fetch(
          `${BASE_URL}/products/${category}/${subcategory}/${subsubcategory}`
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching new products:', error);
        setProducts([]);
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    };
  
    fetchNewProducts();
  }, [category, subcategory, subsubcategory]);

  const handleAttributeChange = (productId, attribute) => {
    setSelectedAttribute((prevState) => ({
      ...prevState,
      [productId]: attribute,
    }));
    setHoveredAttribute((prevState) => ({
      ...prevState,
      [productId]: null,
    }));
  };

  const handleMouseEnter = (productId, attribute) => {
    setHoveredAttribute((prevState) => ({
      ...prevState,
      [productId]: attribute,
    }));
  };

  const handleMouseLeave = (productId) => {
    setHoveredAttribute((prevState) => ({
      ...prevState,
      [productId]: null,
    }));
  };

  const getActiveAttribute = (productId) => {
    return (
      hoveredAttribute[productId] ||
      selectedAttribute[productId] ||
      products.find((product) => product._id === productId).attributes[0]
    );
  };

  return (
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
                        border:
                          hoveredAttribute[product._id] === att ||
                          selectedAttribute[product._id] === att
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
                  <p className="sku" id="skuid">
                    {activeAttribute.sku}
                  </p>
                </div>
                <div className="btm-inquiry">
                  <Link
                    href="javascript:"
                    className="enqbtn place-an-enquiry"
                    data-pname={activeAttribute.sku_subtitle}
                    data-pmodel={activeAttribute.sku}
                    onClick={() => {
                      popupModal();
                    }}
                  >
                    Place an Enquiry
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClientComponent;
