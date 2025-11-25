# backend/Dockerfile

FROM node:20-alpine

# ⭐ [최종 수정] WORKDIR을 에러가 발생하는 경로와 일치시킵니다.
WORKDIR /usr/src/app 

# package.json 복사 (경로 복사 로직은 그대로)
COPY backend/package*.json ./

# 4. 의존성 패키지 설치
RUN npm install

# [★ 추가할 부분 ★] package.json의 main 파일(app.js)을 WORKDIR 루트로 복사
COPY backend/app.js ./

# [수정] 소스 코드 복사 경로 수정
COPY frontend ./frontend
COPY backend ./backend
# ...

EXPOSE 3000
CMD [ "node", "backend/app.js" ]