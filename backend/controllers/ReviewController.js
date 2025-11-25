// backend/controllers/ReviewController.js

import Review from '../models/Review.js'; // MongoDB 모델
import db from '../database.js'; // MySQL 연결 (사용자 정보 조회용)

class ReviewController {
    
    // 1. 리뷰 등록 (POST)
    static async createReview(req, res) {
        // [임시] 실제 구현 시, 토큰 인증을 통해 userId와 authorName을 얻어야 합니다.
        // 지금은 body에서 직접 받는다고 가정합니다.
        const { movieId, authorId, text, rating } = req.body; 

        try {
            // MongoDB는 비정형 데이터를 바로 저장합니다.
            const newReview = await Review.create({
                movieId, authorId, text, rating, 
                authorName: 'Guest User (Auth Required)' // 임시 이름
            });
            
            // ★ Hybrid DB 구현의 예시:
            // 실제 서비스에서는 여기서 MySQL(users)에서 authorName을 조회하여 입력해야 합니다.

            res.status(201).json({ 
                message: '리뷰 등록 완료 (MongoDB 저장)', 
                review: newReview 
            });

        } catch (error) {
            console.error("MongoDB 리뷰 등록 오류:", error);
            res.status(500).json({ message: '리뷰 등록에 실패했습니다.' });
        }
    }

    // 2. 리뷰 조회 (GET)
    static async getReviewsByMovieId(req, res) {
        const { movieId } = req.params; // URL에서 movieId를 가져옴

        try {
            // MongoDB에서 해당 영화의 모든 리뷰를 조회 (movieId 기준)
            const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });

            res.status(200).json({ 
                message: `${movieId}에 대한 리뷰 ${reviews.length}개 조회 완료`,
                reviews
            });

        } catch (error) {
            console.error("MongoDB 리뷰 조회 오류:", error);
            res.status(500).json({ message: '리뷰 조회에 실패했습니다.' });
        }
    }
}

export default ReviewController;