// backend/controllers/UserController.js (최종 보안 적용)

import db from '../database.js';
import bcrypt from 'bcrypt'; // ★ bcrypt 모듈 임포트

const saltRounds = 10; // 암호화 강도 설정 (보통 10~12 사용)

class UserController {
  
  // 1. 회원가입: 비밀번호 암호화 후 저장
  static async handleRegister(req, res) {
    const { email, password, name } = req.body;

    try {
      // ★★★ 비밀번호 암호화 (Hashing) ★★★
      // 비밀번호를 saltRounds 값만큼 암호화합니다. (비동기 처리)
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const sql = 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)';
      // DB에 암호화된 비밀번호 저장
      const [result] = await db.execute(sql, [email, hashedPassword, name]); 

      res.status(201).json({ 
        message: `${name}님, 회원가입이 완료되었습니다! (안전하게 저장됨)`,
        userId: result.insertId
      });

    } catch (error) {
      console.error("회원가입 오류:", error);
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
      } else {
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
      }
    }
  }

  // 2. 로그인: 암호화된 비밀번호와 비교
  static async handleLogin(req, res) {
    const { email, password } = req.body;

    try {
      const sql = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await db.execute(sql, [email]);

      if (rows.length === 0) {
        return res.status(401).json({ message: '존재하지 않는 이메일입니다.' });
      }

      const user = rows[0]; 
      
      // ★★★ 암호화된 비밀번호 비교 (비동기 처리) ★★★
      // 입력받은 비밀번호와 DB의 암호화된 비밀번호를 비교합니다.
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
      }

      // 로그인 성공
      res.status(200).json({ 
        message: `${user.name}님, 환영합니다!`,
        user: { id: user.id, name: user.name, email: user.email }
      });

    } catch (error) {
      console.error("로그인 오류:", error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  }

  // 3. 프로필 조회 (간단히)
  static async getUserProfile(req, res) {
    res.status(200).json({ message: "프로필 조회 기능은 로그인 후에 가능합니다." });
  }
}

export default UserController;