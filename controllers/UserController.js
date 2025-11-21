// --- /controllers/UserController.js ---
// (모델을 가져와서 사용)
import User from '../backend/models/User.js';

class UserController {
  // 회원가입 처리
  static async handleRegister(req, res) {
    try {
      const { email, password, name } = req.body;
      // TODO: 입력값 검증 (validation)

      // 모델을 통해 사용자 생성
      const newUser = await User.create(email, password, name);
      res.status(201).json({ message: "User created!", user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 로그인 처리
  static async handleLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);

      if (!user || !user.validatePassword(password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // TODO: 로그인 성공 (JWT 토큰 생성)
      res.status(200).json({ message: "Login successful!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;