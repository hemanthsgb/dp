require('dotenv').config();
const express = require('express');
const { updatePrices } = require('./pricing');

const app = express();

// Route to check if the service is running
app.get('/', (req, res) => {
    res.send('Shopify pricing update service is running!');
});

// Route to manually trigger price update
app.get('/run-script', async (req, res) => {
    try {
        await updatePrices();
        res.send('Price update completed successfully!');
    } catch (error) {
        res.status(500).send(`Error updating prices: ${error.message}`);
    }
});

// Ensure the server listens on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
