// --- /models/User.js ---
// (MySQL 또는 MongoDB와 연동될 데이터 구조)

class User {
  constructor(email, password, name) {
    this.email = email;
    this.password = password; // 실제로는 해싱(hashing)하여 저장
    this.name = name;
  }

  // (static) DB에서 이메일로 사용자 찾기
  static findByEmail(email) {
    // DB 쿼리 로직 (예: SELECT * FROM users WHERE email = ?)
    console.log(`Finding user by email: ${email}`);
  }

  // (static) DB에 새 사용자 저장
  static create(email, password, name) {
    // DB 쿼리 로직 (예: INSERT INTO users (...) VALUES (...))
    console.log(`Creating user: ${name}`);
  }

  // 비밀번호 검증
  validatePassword(inputPassword) {
    // 해시된 비밀번호 비교 로직
    return this.password === inputPassword; // (실제로는 bcrypt.compare 사용)
  }
}

export default User;