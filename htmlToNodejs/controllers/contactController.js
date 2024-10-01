const Contact = require('../models/contact');

exports.getContactPage = (req, res) => {
    res.render('contact', { title: 'Contact' });
};

exports.postContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
