// database.js 파일의 최상단에 추가
require('dotenv').config();

<<<<<<< HEAD
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
=======
import mysql from 'mysql2/promise';

// MySQL 연결 설정 (수영장처럼 연결을 미리 만들어두는 'Pool' 방식)
const pool = mysql.createPool({
  host: 'localhost',        // 내 컴퓨터
  user: 'root',             // MySQL 아이디 (기본값 root)
  password: '', // ★ 중요: 설치할 때 정한 비밀번호로 바꾸세요!
  database: 'johnwick_db',  // 아까 만든 데이터베이스 이름
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 연결이 잘 되는지 확인하는 테스트 코드
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL 데이터베이스 연결 성공!');
    conn.release(); // 확인했으니 연결 반납
  })
  .catch(err => {
    console.error('❌ MySQL 연결 실패:', err);
  });

export default pool;
>>>>>>> 68915b07a36fb8702ce7598630f40fedc8298bdc
