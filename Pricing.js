async function updatePrices() {
    const allProducts = await getProducts();
    if (allProducts.length === 0) {
        console.log("No products found in the store.");
        return;
    }

}
module.exports = { updatePrices };
