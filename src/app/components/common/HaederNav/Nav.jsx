'use client';
import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://npkohlercompaignapi.onrender.com/api/v1';

export default function Header() {
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

  //if (loading) return <div>Loading...</div>;
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
        <>
        <nav id="navbar" className="navbar">
          <ul>
            <li className="dropdown mega-menu">
              <a href="#">
                {" "}
                Bathroom <i className="bi bi-chevron-down toggle-dropdown" />
              </a>
              <div className="mega-wrap">
                <div className="containers-out">
                  <div className="container-fluid d-flex align-items-start">
                    <div
                      className="tab-pane fade show active"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <div className="box-wrap box-nowrap box-nowrap01">
                        <div className="boxout">
                          <div className="boxleft">
                            <div className="box cat-title">
                              <h2>
                                Let’s create <br /> your dream <br /> Bathroom.{" "}
                              </h2>
                            </div>
                              {groupedData['bathroom'] && Object.keys(groupedData['bathroom']).map(subcatUrl => (
                                <div className="box" key={subcatUrl}>
                                  <h2>{subcategories.find(sc => sc.subcat_url === subcatUrl)?.subcat_name || ''}</h2>
                                  <ul>
                                    {groupedData['bathroom'][subcatUrl].map(subsubcat => (
                                      <li key={subsubcat.url}>
                                        {subsubcat.url && sscatURLs.includes(subsubcat.url) ? (
                                        <a href={`/product/bathroom/${subcatUrl}/${subsubcat.url}`}>
                                          {subsubcat.name}
                                        </a>
                                          ) : (
                                            <span>{subsubcat.name}</span> 
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            <div className="box"> &nbsp; </div>
                            <div className="box">&nbsp; </div>
                          </div>
                          <div className="boxright about-menu-img">
                          <Image
                              src="/img/bathroom-menu-img.jpg"
                              className="blacks"
                              alt="Bathroom"
                              width={247}
                              height={339}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="dropdown mega-menu">
              <a href="#">
                {" "}
                Faucets <i className="bi bi-chevron-down toggle-dropdown" />
              </a>
              <div className="mega-wrap">
                <div className="containers-out">
                  <div className="container-fluid d-flex align-items-start">
                    <div
                      className="tab-pane fade show active"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <div className="box-wrap box-nowrap box-nowrap01">
                        <div className="boxout">
                          <div className="boxleft">
                            <div className="box cat-title">
                              <h2>
                                Let’s create <br /> your dream <br /> Bathroom.{" "}
                              </h2>
                            </div>
                            {groupedData['faucets'] && Object.keys(groupedData['faucets']).map(subcatUrl => (
                                <div className="box" key={subcatUrl}>
                                  <h2>{subcategories.find(sc => sc.subcat_url === subcatUrl)?.subcat_name || ''}</h2>
                                  <ul>
                                    {groupedData['faucets'][subcatUrl].map(subsubcat => (
                                      <li key={subsubcat.url}>
                                        {subsubcat.url && sscatURLs.includes(subsubcat.url) ? (
                                          <a href={`/product/faucets/${subcatUrl}/${subsubcat.url}`}>
                                            {subsubcat.name}
                                          </a>
                                          ) : (
                                            <span>{subsubcat.name}</span> 
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            <div className="box">&nbsp; </div>
                            <div className="box">&nbsp; </div>
                          </div>
                          <div className="boxright about-menu-img">
                            <Image
                              src="/img/bathroom-menu-img.jpg"
                              className="blacks"
                              alt="Bathroom"
                              width={247}
                              height={339}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="dropdown mega-menu">
              <a href="#">
                Toilet <i className="bi bi-chevron-down toggle-dropdown" />
              </a>
              <div className="mega-wrap">
                <div className="containers-out">
                  <div className="container-fluid d-flex align-items-start">
                    <div
                      className="tab-pane fade show active"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <div className="box-wrap box-nowrap box-nowrap01">
                        <div className="boxout">
                          <div className="boxleft">
                            <div className="box cat-title">
                              <h2>
                                Let’s create <br /> your dream <br /> Toilet.{" "}
                              </h2>
                            </div>
                            {groupedData['toilet'] && Object.keys(groupedData['toilet']).map(subcatUrl => (
                                <div className="box" key={subcatUrl}>
                                  <h2>{subcategories.find(sc => sc.subcat_url === subcatUrl)?.subcat_name || ''}</h2>
                                  <ul>
                                    {groupedData['toilet'][subcatUrl].map(subsubcat => (
                                      <li key={subsubcat.url}>
                                        {subsubcat.url && sscatURLs.includes(subsubcat.url) ? (
                                        <a href={`/product/toilet/${subcatUrl}/${subsubcat.url}`}>
                                          {subsubcat.name}
                                        </a>
                                          ) : (
                                            <span>{subsubcat.name}</span> 
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            <div className="box">&nbsp; </div>
                            <div className="box">&nbsp; </div>
                          </div>
                          <div className="boxright about-menu-img">
                            <Image
                              src="/img/kitchen-menu-img.jpg"
                              className="blacks"
                              alt="Bathroom"
                              width={247}
                              height={339}
                            />

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
           
           <li className="dropdown mega-menu">
              <a href="/about-us">
                About Us <i className="bi bi-chevron-down toggle-dropdown" />
              </a>
              <div className="mega-wrap">
                <div className="containers-out">
                  <div className="container-fluid d-flex align-items-start">
                    <div
                      className="tab-pane fade show active"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <div className="box-wrap box-nowrap box-nowrap01">
                        <div className="boxout">
                          <div className="boxleft">
                            <div className="box cat-title">
                              <h2>
                                Inspiration <br />
                                to spark <br />
                                your <br />
                                imagination.{" "}
                              </h2>
                            </div>
                            <div className="box">
                              <ul>
                                <li>
                                  <a href="whoweare.php">Who We Are</a>
                                </li>
                                <li>
                                  <a href="ourheritage.php">Heritage</a>
                                </li>
                                <li>
                                  <a href="socialimpact.php">Social Impact</a>
                                </li>
                                <li>
                                  <a href="sustainability.php">
                                    Sustainability
                                  </a>
                                </li>
                                <li>
                                  <a href="#">150th Anniversary</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="boxright about-menu-img">
                            <Image
                                src="/img/about-menu-img.jpg"
                                className="blacks"
                                alt="Bathroom"
                                width={247}
                                height={339}
                              />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="dropdown mega-menu">
              <a href="#">Ideas </a>
            </li>
           
          </ul>
          <i className="bi bi-list mobile-nav-toggle" />
        </nav>

        </>
    )
}        