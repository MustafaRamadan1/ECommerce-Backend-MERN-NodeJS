import express from 'express';
import ratingController from '../controllers/rating.controller';
import protect from '../middlewares/auth.middleware'

const router = express.Router();


router.route('/').post(ratingController.createRating);
export default router;