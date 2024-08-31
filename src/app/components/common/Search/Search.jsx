'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 



export default function Search() {
    const [sku, setSku] = useState('');
    const [title, setTitle] = useState('');
    const [subsubcategory, setSubsubcategory] = useState('');
    const router = useRouter();
  
    const submitHandler = (e) => {
      e.preventDefault();
  
      // Construct the URL dynamically based on which parameters are set
      const params = new URLSearchParams();
  
      if (sku) params.append('product-sku', sku);
      if (title) params.append('product-title', title);
      if (subsubcategory) params.append('subsubcategory-name', subsubcategory);
  
      const url = `/search?${params.toString()}`;
      console.log(url); // Debugging the generated URL
      router.push(url);
    };

    function searchHide(){
      let searchpanel = document.querySelector('.serach-wrap');
      searchpanel.style.right = '-100%';      
    }

  return (
    <>
      <div className="serach-wrap">
        <div className="searchDiv">
          <div className="cls-button">
            <button>X</button>
          </div>
            <div className="search-box">
                <form onSubmit={submitHandler} id="searchForm">
                    <input
                        onChange={(e) => setSku(e.target.value)}
                        type="search"
                        placeholder="Search by SKU"
                        name="product-sku"
                        maxLength={250}
                        autoComplete="off"
                        value={sku}
                        onKeyDown={(e) => {if (e.key === "Enter") searchHide();}}

                    />
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="search"
                        placeholder="Search by Title"
                        name="product-title"
                        maxLength={250}
                        autoComplete="off"
                        value={title}
                    />
                    <input
                        onChange={(e) => setSubsubcategory(e.target.value)}
                        type="search"
                        placeholder="Search by Subsubcategory"
                        name="subsubcategory-name"
                        maxLength={250}
                        autoComplete="off"
                        value={subsubcategory}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
          <div className="search-btm">
            <div className="trending-search search-fl">
              <h2>Trending Searches</h2>
              <ul>
                <li>
                  <a href="#">Toilets</a>
                </li>
                <li>
                  <a href="#">Purist</a>
                </li>
                <li>
                  <a href="#">Kitchen Faucets</a>
                </li>
                <li>
                  <a href="#">Bathroom Sink Faucets</a>
                </li>
              </ul>
            </div>
            <div className="recent-search search-fl">
              <div className="s-flex">
                <h2>Recently Searched</h2>
                <div className="clear">
                  <button>Clear All</button>
                </div>
              </div>
              <ul>
                <li>
                  <a href="#">Toilets</a>
                </li>
                <li>
                  <a href="#">About us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
