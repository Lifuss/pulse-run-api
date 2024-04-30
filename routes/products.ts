import { Router } from 'express';
import categories from '../controllers/products/categories';
import upload from '../middlewares/upload';
import createProducts from '../controllers/products/createProducts';
import validateBody from '../middlewares/validateBody';
import {
  orderJoiSchema,
  schemaProductCreate,
} from '../schemas/joi/joiValidator';
import getNewProducts from '../controllers/products/newProducts';
import getProductsOnSale from '../controllers/products/salesProducts';
import products from '../controllers/products/products';
import getById from '../controllers/products/getById';
import getSearchProducts from '../controllers/products/getSearchProducts';
import updatePrices from '../controllers/products/updatePrices';
import createOrder from '../controllers/products/createOrder';

const router = Router();

router.get('/categories', categories);
router.get('/', products);

router.post(
  '/create',
  upload.fields([
    { name: 'imgThumbnail', maxCount: 1 },
    { name: 'imgGallery', maxCount: 4 },
  ]),
  validateBody(schemaProductCreate),
  createProducts,
);
router.post('/orders', validateBody(orderJoiSchema), createOrder);

router.get('/newest', getNewProducts);
router.get('/sales', getProductsOnSale);
router.get('/search', getSearchProducts);
router.get('/update-prices', updatePrices);
router.get('/:id', getById);

export default router;
