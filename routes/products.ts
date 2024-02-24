import { NextFunction, Request, Response, Router } from 'express';
import categories from '../controllers/products/categories';
import upload from '../middlewares/upload';
import createProducts from '../controllers/products/createProducts';

const router = Router();

router.get('/categories', categories);
router.post(
  '/create',
  upload.fields([
    { name: 'imgThumbnail', maxCount: 1 },
    { name: 'imgGallery', maxCount: 5 },
  ]),
  createProducts,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    // This will catch any errors from the Multer middleware
    console.error(error);
    res.status(500).send({ error: error.message });
  },
);

export default router;
