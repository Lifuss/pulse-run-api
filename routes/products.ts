import { Router } from 'express';
import categories from '../controllers/products/categories';
import upload from '../middlewares/upload';
import createProducts from '../controllers/products/createProducts';
import validateBody from '../middlewares/validateBody';
import { schemaProductCreate } from '../schemas/joi/joiValidator';
import getNewProducts from '../controllers/products/newProducts';

const router = Router();

router.get('/categories', categories);

router.post(
  '/create',
  upload.fields([
    { name: 'imgThumbnail', maxCount: 1 },
    { name: 'imgGallery', maxCount: 4 },
  ]),
  validateBody(schemaProductCreate),
  createProducts,
);
router.get('/newest', getNewProducts);

export default router;
