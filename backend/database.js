// database.js 파일의 최상단에 추가
require('dotenv').config();

// MySQL 접속 정보 수정
const connection = mysql.createConnection({
    // 기존 코드: host: 'localhost',
    host: process.env.DB_HOST,
    // 기존 코드: user: 'root',
    user: process.env.DB_USER,
    // **이 부분을 .env에서 불러옵니다.**
    password: process.env.DB_PASSWORD, 
    // 기존 코드: database: 'johnwick'
    database: process.env.DB_NAME 
});