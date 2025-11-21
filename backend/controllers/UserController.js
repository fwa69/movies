// backend/controllers/UserController.js

// 아까 만든 DB 연결(pool)을 가져옵니다.
import db from '../database.js';

class UserController {
  
  // 1. 회원가입: 사용자가 보낸 정보를 DB에 'INSERT'
  static async handleRegister(req, res) {
    // 프론트엔드에서 보낸 데이터 받기
    const { email, password, name } = req.body;
    console.log('회원가입 요청:', email, name);

    try {
      // SQL 명령어: users 테이블에 데이터를 집어넣어라(INSERT)
      const sql = 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)';
      
      // DB에 명령 실행!
      const [result] = await db.execute(sql, [email, password, name]);

      // 성공하면 201번(Created) 응답
      res.status(201).json({ 
        message: `${name}님, 회원가입이 완료되었습니다!`,
        userId: result.insertId // 방금 생긴 ID 번호
      });

    } catch (error) {
      console.error(error);
      // 에러 처리 (예: 이메일 중복 등)
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
      } else {
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
      }
    }
  }

  // 2. 로그인: DB에서 이메일을 찾아 비밀번호 비교
  static async handleLogin(req, res) {
    const { email, password } = req.body;
    console.log('로그인 요청:', email);

    try {
      // SQL 명령어: 이메일이 같은 사람을 찾아라(SELECT)
      const sql = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await db.execute(sql, [email]);

      // 1) 이메일이 없는 경우
      if (rows.length === 0) {
        return res.status(401).json({ message: '존재하지 않는 이메일입니다.' });
      }

      const user = rows[0]; // 찾은 사용자 정보

      // 2) 비밀번호 비교 (지금은 단순 비교, 나중엔 암호화 필요)
      if (user.password !== password) {
        return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
      }

      // 3) 로그인 성공
      res.status(200).json({ 
        message: `${user.name}님, 환영합니다!`,
        user: { id: user.id, name: user.name, email: user.email }
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  }

  // 3. 프로필 조회 (간단히)
  static async getUserProfile(req, res) {
    res.status(200).json({ message: "프로필 조회 기능은 로그인 후에 가능합니다." });
  }
}

export default UserController;