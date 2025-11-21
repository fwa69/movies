// backend/app.js

import express from 'express';
import cors from 'cors';
import path from 'path';            // [필수] 경로 기능
import { fileURLToPath } from 'url'; // [필수] 현재 위치 확인 기능
import userRoutes from './routes/userRoutes.js';
import db from './database.js';

// 현재 파일의 경로를 계산하는 코드 (ES Module에서 필요)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// 1. 미들웨어 설정
app.use(cors()); 
app.use(express.json());

// 2. [핵심] 정적 파일(HTML, CSS, JS, 이미지) 제공 설정
// backend 폴더의 상위(..)로 가서 frontend 폴더를 찾아라!
app.use(express.static(path.join(__dirname, '../frontend')));

// 3. API 라우트 연결
app.use('/api/users', userRoutes);

// 4. [핵심] 메인 페이지 연결
// 도메인만 치고 들어오면 index.html을 보내줘라
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 5. 서버 실행
app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  console.log(`🌐 외부 접속 주소: http://j-assignment-web.linkpc.net (공유기 설정 필요)`);
});