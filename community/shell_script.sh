npm init -y  // package.json 파일 생성 <https://docs.npmjs.com/creating-a-package-json-file>

//라이브러리 설치
npm install express                  // 백엔드 서버
npm inatall body-parser              // 미들웨어에서 들어오는 req.body 요청 구문 분석, 미 사용 시 디폴트 값으로 Undefined이 설정
npm install cors                     // 서로 다른 도메인, 프로토콜, 포트 연결(예: 프론트엔드 서버 8000번-백엔드 서버 3000번)
npm install cookie-parser            // 쿠키 구현 -> 쿠키 생성, 삭제 등 요청 받은 구문 분석하고 추출, request(req) 객체에 cookies 속성이 부여
npm install express-session          // 세션 구현 -> 세션 데이터는 쿠키 자체에 저장되지 않고 세션 ID만 저장, 즉 서버 측에 저장됨, 서버에서 sid로 사용자 식별
npm install mysql2                   // 데이터베이스 설치
npm install express-mysql-session    // 세션과 데이터베이스 연결

// package.json에 기입
"scripts": {
    "start": "node app.js"
  }
// 프론트엔드, 백엔드 전용 app.js에 각각 기입

npm start  //서버 시작
