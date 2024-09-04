// src/app/product/[slug]/page.js


// Define dynamic params for static generation
export async function generateStaticParams() {
    const slugs = ['product-1', 'product-2', 'product-3'];

    // Ensure this returns an array
    const paths = slugs.map(slug => ({
        params: { slug },
    }));

    return paths;  // This must be an array
}


// Fetch data for a specific slug
async function getProductData(slug) {
    // Replace this with your actual data fetching logic
    const product = { name: slug, description: `Description for ${slug}` };
    return product;
}

export default async function ProductPage({ params }) {
    const { slug } = params;

    // This function must return a valid object
    const product = await getProductData(slug);

    // Verify that product is an object and used appropriately
    return (
        <div>
            <h1>Product Detail Page</h1>
            <h1>Product Detail Page</h1>
            <h1>Product Detail Page</h1>
            <h1>Product Detail Page</h1>
            <h1>Product Detail Page</h1>
            <h1>Product Detail Page</h1>
            <h1>Product Detail Page</h1>
            <h1>Product Detail Page</h1>
            <p>Product: {product.name}</p>
            <p>Description: {product.description}</p>
        </div>
    );
}