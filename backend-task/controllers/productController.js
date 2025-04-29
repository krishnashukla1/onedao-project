const { Op } = require('sequelize');
const Product = require('../models/product');


//  Create Product
const createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      user_id: userId,
    });
    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Get All Products (only for the logged-in user)
// const getProducts = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const products = await Product.findAll({ where: { user_id: userId } });
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products', error: error.message });
//   }
// };

//GET ALL PRODUCTS WITH PAGINATION

const getProducts = async (req, res) => {
  const userId = req.user.id;

  try {
    // Extract query parameters
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
      name,
      price,
      stock,
    } = req.query;

    // Setup filters
    const where = { user_id: userId };
    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }
    if (price) {
      where.price = price;
    }
    if (stock) {
      where.stock = stock;
    }

    const offset = (page - 1) * limit;

    // Fetch with pagination, filtering, sorting
    const result = await Product.findAndCountAll({
      where,
      order: [[sortBy, order.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      totalItems: result.count,
      totalPages: Math.ceil(result.count / limit),
      currentPage: parseInt(page),
      products: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching products',
      error: error.message,
    });
  }
};




// Update Product
const updateProduct = async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const { name, description, price, stock } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findOne({
      where: { id: productId, user_id: userId },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    await product.update({ name, description, price, stock });
    res.status(200).json({ message: 'Product updated', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const userId = req.user.id;

  try {
    const product = await Product.findOne({
      where: { id: productId, user_id: userId },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
