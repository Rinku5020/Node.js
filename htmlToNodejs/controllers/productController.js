const Product = require('../models/product');

// Get products and render the product page
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products, successMessage: null, title: 'Products' });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    try {
        const newProduct = new Product({ name, price, description, imageUrl });
        await newProduct.save();

        // Redirect back to products page with a success message
        const products = await Product.find(); // Fetch products again
        res.render('products', { products, successMessage: 'Product added successfully!', title: 'Products' });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
