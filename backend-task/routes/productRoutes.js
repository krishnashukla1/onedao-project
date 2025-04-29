const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, createProduct);
router.get('/', authenticate,getProducts);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

module.exports = router;
