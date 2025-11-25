// backend/models/Review.js

import mongoose from 'mongoose';

// MongoDB의 스키마를 정의 (Mongoose 사용)
const reviewSchema = new mongoose.Schema({
    // 리뷰 대상 영화 ID (예: 'johnwick1')
    movieId: {
        type: String, 
        required: true,
        trim: true
    },
    // 리뷰 작성자 ID (MySQL users.id와 연결되는 필드)
    authorId: {
        type: Number, 
        required: true
    },
    // 작성자 이름 (DB 쿼리 없이 빠르게 보여주기 위해 저장)
    authorName: {
        type: String,
        required: true,
        trim: true
    },
    // 리뷰 본문
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    // 별점
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
}, { 
    // MongoDB가 자동으로 생성 시간 및 업데이트 시간을 기록하도록 설정
    timestamps: true 
});

// 'Review' 모델을 생성하고 외부에 공개
const Review = mongoose.model('Review', reviewSchema);

export default Review;