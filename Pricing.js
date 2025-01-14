async function updatePrices() {
    const allProducts = await getProducts();
    if (allProducts.length === 0) {
        console.log("No products found in the store.");
        return;
    }

    for (const product of PRODUCTS) {
        const metalPrice = await getMetalPrice(product.apiUrl);
        if (!metalPrice) continue;

        const adjustedPrice = product.formula(metalPrice);
        console.log(`Calculated new price for ${product.tag}: ${adjustedPrice}`);

        // Filter products by tag
        const filteredProducts = allProducts.filter((p) =>
            p.tags.split(", ").includes(product.tag)
        );

        if (filteredProducts.length === 0) {
            console.log(`No products found with tag: ${product.tag}`);
            continue;
        }

        // Update only the filtered products
        for (const p of filteredProducts) {
            await updateProductPrice(p.id, adjustedPrice);
        }
    }
}
module.exports = { updatePrices };
