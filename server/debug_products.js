const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agrimart';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        const count = await Product.countDocuments();
        console.log(`Total products: ${count}`);

        const products = await Product.find({}, { image: 0 }).limit(10);
        console.log('Sample products (without images):', JSON.stringify(products, null, 2));

        const firstProduct = await Product.findOne();
        if (firstProduct && firstProduct.image) {
            console.log(`Image length: ${firstProduct.image.length} characters`);
        }

        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
