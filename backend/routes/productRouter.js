import Router from 'express'
import { getAllProducts, getProductById, addProduct, updateProductById, deleteProductById } from './../controllers/productControllers.js'

const router = Router()

router.route('/').get(getAllProducts).post(addProduct)
router.route('/:id').get(getProductById).put(updateProductById).delete(deleteProductById)


export default router;