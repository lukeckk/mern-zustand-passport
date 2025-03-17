// import products from './../dummyData/products.js'  // dummy data
import Product from './../models/productModel.js'  // database


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: 'Showing all products',
      data: products
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
}

export const getProductById = async (req, res) => {
  const paramValue = req.params.id;
  try {
    const product = await Product.findById(paramValue);
    if (product) {
      res.status(200).json({
        message: `Product with id ${paramValue} is found`,
        data: product
      });
    } else {
      res.status(404).json({
        message: `Product with id ${paramValue} is not found`
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

export const addProduct = async (req, res) => {
  const content = req.body

  // Validate input data
  if (!content.name || !content.price) {
    return res.status(400).json({
      message: "Missing required fields: name and price"
    });
  }

  try {
    // Create a new product document
    const newProduct = new Product({
      name: content.name,
      category: content.category,
      price: content.price,
      description: content.description,
      features: content.features,
      image: content.image
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: `Product ${savedProduct.name} is added`,
      data: savedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding product',
      error: error.message
    });
  }
}

export const updateProductById = async (req, res) => {
  const content = req.body
  const paramValue = req.params.id
  try {
    const product = await Product.findByIdAndUpdate(
      paramValue,
      content,
      { new: true } // Return the updated document
    );

    if (product) {
      res.status(200).json({
        message: `Product with id ${paramValue} is updated`,
        data: product
      });
    } else {
      res.status(404).json({
        message: `Product with id ${paramValue} not found`
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
}

export const deleteProductById = async (req, res) => {
  const paramValue = req.params.id;
  try {
    const result = await Product.findByIdAndDelete(paramValue);
    if (result) {
      res.status(200).json({
        message: `Product with id ${paramValue} successfully deleted`
      });
    } else {
      res.status(404).json({
        message: `Product with id ${paramValue} not found`
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
}

