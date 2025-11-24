// backend/database.js (최종 코드)

// 1. dotenv 패키지를 불러와 환경 변수(process.env)를 로드합니다.
import 'dotenv/config'; 
import mysql from 'mysql2/promise'; // Promise를 지원하는 mysql2 모듈


// MySQL Connection Pool Setup using environment variables
// Connection Pool은 웹 서버처럼 동시 접속이 많은 환경에 적합합니다.
const pool = mysql.createPool({
  // .env 파일이 없을 경우 대비하여 기본값(localhost, johnwick_db)을 설정했습니다.
  host: process.env.DB_HOST || 'localhost', 
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD, // ★ .env 파일에서 비밀번호를 불러옵니다.
  database: process.env.DB_NAME || 'johnwick_db',
  
  waitForConnections: true,
  connectionLimit: 10, // 최대 연결 개수
  queueLimit: 0
});

// 연결 테스트 및 성공 로그 출력
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL 데이터베이스 연결 성공! (환경 변수 적용 완료)');
    conn.release(); // 연결 객체를 반환합니다.
  })
  .catch(err => {
    console.error('❌ MySQL 연결 실패:', err);
    // 연결 실패 시 서버는 실행되지만 콘솔에 오류를 남깁니다.
  });

// 2. [★이 부분이 중요★] UserController.js가 사용할 수 있도록 pool 객체를 내보냅니다.
export default pool;