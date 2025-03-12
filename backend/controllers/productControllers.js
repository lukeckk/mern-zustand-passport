import products from './../dummyData/products.js'

export const getAllProducts = async (req, res) => {
  res.status(200).json({
    message: "This is all products",
    data: products
  })
}


