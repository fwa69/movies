// backend/routes/reviewRoutes.js

import express from 'express';
import ReviewController from '../controllers/ReviewController.js'; // 3단계에서 만들 파일

const router = express.Router();

// 1. 리뷰 등록 (POST /api/reviews)
router.post('/', ReviewController.createReview);

// 2. 특정 영화의 리뷰 조회 (GET /api/reviews/:movieId)
router.get('/:movieId', ReviewController.getReviewsByMovieId);

export default router;