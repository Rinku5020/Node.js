const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const contactController = require('../controllers/contactController');

// Home route
router.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// About route
router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Contact routes
router.get('/contact', contactController.getContactPage);
router.post('/contact', contactController.postContactForm);

// Product routes
router.get('/products', productController.getProducts);
router.post('/products', productController.addProduct); // New route for adding products

module.exports = router;
