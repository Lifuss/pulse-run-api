import { Router } from 'express';
import categories from '../controllers/products/categories';

const router = Router();

router.get('/categories', categories);

export default router;
