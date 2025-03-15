// import products from './../dummyData/products.js'  // dummy data
import Product from './../models/productModel.js'  // datbase

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json({
      message: 'Showing all products',
      data: products
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
}

export const getProductById = (req, res) => {
  const paramValue = req.params.id; // Access the specific parameter
  const product = products.find(product => product.id === Number(paramValue))
  if (product) {
    res.status(200).json({
      message: `Product with id ${paramValue} is found`,
      data: product
    })
  }
  else {
    res.status(404).json({
      message: `Product with id ${paramValue} is not found`
    })
  }
}

export const addProduct = (req, res) => {
  const content = req.body

  // Validate input data
  if (!content.name || !content.price) {
    return res.status(400).json({
      message: "Missing required fields: name and price"
    });
  }

  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  // Insert new id here and the body from req body, if a property doesnt exist, it will populate anyway
  const newProduct = { id: newId, ...content };
  console.log("Before adding:", products); // Log current products
  products.push(newProduct);
  console.log("After adding:", products); // Log updated products
  res.status(200).json({
    message: `Product ${content.name} is addded`,
    data: newProduct
  })
}

export const updateProductById = (req, res) => {
  const content = req.body
  const paramValue = req.params.id
  const product = products.find(product => product.id === Number(paramValue))
  console.log("Before adding:", products); // Log current products

  //Replace the product  with content, id stays the same
  if (product) {
    product.name = content.name
    product.category = content.category
    product.price = content.price
    product.description = content.description
    product.features = content.features
    product.image = content.image


    console.log("After adding:", products); // Log updated products
    res.status(200).json({
      message: `Product with id ${paramValue} is updated`,
      data: product
    })
  }
  else {
    res.status(400).json({
      message: `Error updating product with id ${paramValue}`,
    })
  }
}

export const deleteProductById = (req, res) => {
  const paramValue = req.params.id
  const productIndex = products.findIndex(product => product.id === Number(paramValue))

  console.log("Before adding:", products); // Log current products
  if (productIndex != -1) {
    products.splice(productIndex, 1)
    console.log("After adding:", products); // Log updated products
    res.status(200).json({
      message: `Product with id ${paramValue} successfully deleted`
    })
  }
  else {
    res.status(400).json({
      message: `Error deleting product with id ${paramValue}`
    })
  }
}

