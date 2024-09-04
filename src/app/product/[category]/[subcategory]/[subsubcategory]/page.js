import ClientComponent from './ClientComponent';
import Leftmenu from "../../../../components/common/Sidebar/Leftmenu";
import Link from 'next/link';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://npkohlercompaignapi.onrender.com/api/v1';

// Function to fetch categories
async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  return data.category || []; 
}

async function fetchSubcategories(cat_url) {
  const response = await fetch(`${BASE_URL}/subcategories?category=${cat_url}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch subcategories for ${cat_url}`);
  }
  const data = await response.json();
  return data.subcat || [];
}

async function fetchSubsubcategories(subcat_url) {
  try {
    const response = await fetch(`${BASE_URL}/subsubcategories?subcategory=${subcat_url}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch subsubcategories for ${subcat_url}`);
    }
    const data = await response.json();
    return data.subsubcat || []; 
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const categories = await fetchCategories();
    const paths = [];

    for (const category of categories) {
      const subcategories = await fetchSubcategories(category.cat_url);
      for (const subcategory of subcategories) {
        const subsubcategories = await fetchSubsubcategories(subcategory.subcat_url);

        if (subsubcategories.length > 0) {
          for (const subsubcategory of subsubcategories) {
            paths.push({
              category: category.cat_url,
              subcategory: subcategory.subcat_url,
              subsubcategory: subsubcategory.subsubcat_url || 'no-subsubcategory',
            });
          }
        } else {
          paths.push({
            category: category.cat_url,
            subcategory: subcategory.subcat_url,
            subsubcategory: 'no-subsubcategory',
          });
        }
      }
    }
    return paths;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function Page({ params }) {
  const { category, subcategory, subsubcategory } = params;

  try {
    const response = await fetch(`${BASE_URL}/products/${category}/${subcategory}/${subsubcategory}`);
    
    if (!response.ok) {
      notFound();
      return null;
    }

    const data = await response.json();
    const products = data.products;

    if (!products || products.length === 0) {
      notFound();
      return null;
    }

    const subsubcategoryName = products[0]?.subsubcategory?.subsubcat_name || 'No Subsubcategory';
    const subcategoryName = products[0]?.subcategory?.subcat_name || 'No Subcategory';
    const categoryName = products[0]?.category?.cat_name || 'No Category';

    return (
      <>
        <main id="main">
          <div className="inner-page product-list">
            <div className="container-fluid">
              <section className="top-section sectionbg1">
                <div className="container-fluid">
                  <div className="top-head">
                    <div className="breadcrumb">
                      <ul>
                        <li>Home <span>/</span></li>
                        <li>{categoryName} <span>/</span></li>
                        <li>{subcategoryName} <span>/</span></li>
                        <li>{subsubcategoryName}</li>
                      </ul>
                    </div>
                    <h2>{subsubcategoryName}</h2>
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
                        <ClientComponent products={products} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </>
    );
  } catch (error) {
    notFound();
    return null;
  }
}
