// --- /models/Project.js ---
// (MySQL 또는 MongoDB와 연동될 데이터 구조)

class Project {
  constructor(title, description, githubLink, userId) {
    this.title = title;
    this.description = description;
    this.githubLink = githubLink;
    this.userId = userId; // 이 프로젝트를 작성한 User의 ID
  }

  // (static) 특정 사용자의 모든 프로젝트 찾기
  static findByUserId(userId) {
    // DB 쿼리 로직 (예: SELECT * FROM projects WHERE userId = ?)
    console.log(`Finding projects for user: ${userId}`);
  }

  // (static) DB에 새 프로젝트 저장
  static create(title, description, githubLink, userId) {
    // DB 쿼리 로직 (예: INSERT INTO projects (...) VALUES (...))
    console.log(`Creating project: ${title}`);
  }
}

export default Project;