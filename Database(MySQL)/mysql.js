import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: "localhost", // 데이터베이스 주소
    port: "3306", // 데이터베이스 포트
    user: "root", // 로그인 계정
    password: "dkssud!12", // 비밀번호
    database: "community" // 엑세스할 데이터베이스
});

// 데이터베이스와 연동하기
connection.connect(err => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        return;
    }
    console.log('MySQL 연결 성공');
});

export default connection;

// 맥북 터미널에서 실행
// cd /usr/local/mysql/bin
// ./mysql -u root -p