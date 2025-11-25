// backend/mongo.js (최종 확정 코드)

import mongoose from 'mongoose';
import 'dotenv/config'; 

// ⭐ [수정] localhost 대신 127.0.0.1로 명확히 지정하여 DNS 해석 오류 방지
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/johnwick_reviews'; 

const connectMongo = async () => {
    try {
        // [핵심] Mongoose를 사용하여 MongoDB에 접속을 시도합니다.
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB 데이터베이스 연결 성공!');
    } catch (error) {
        console.error('❌ MongoDB 연결 실패: 서버가 켜져 있는지, URI가 올바른지 확인하세요.', error.message);
    }
};

export default connectMongo;