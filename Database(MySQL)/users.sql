CREATE TABLE users (
    userId INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL,
    nickName VARCHAR(10) UNIQUE,
    chooseFile LONGBLOB,
    PRIMARY KEY (userId)
);

insert into users(userId, email, password, nickName, chooseFile) values(23, 'test1@email.com', 'Test12!!', '테스트1', 'NULL');
INSERT INTO users (userId, email, password, nickName, chooseFile) VALUES
(1, 'email@email.com', 'ASdf12**', '스타트업코드', 0x307837323635363337343245373036453637),
(2, 'kacls@email.com', 'Kakao12!!', '카클스', 0x307837323635363337343245373036453637),
(3, 'rlfls98@naver.com', 'asDF12@@', 'rlfls98', 0x307837323635363337343245373036453637),
(4, 'hhrsxz@email.com', 'B*rT6j!2', '집에가고싶다', 0x307837323635363337343245373036453637),
(5, 'xvqplk@email.com', 'a$Df1234', 'S개발자', 0x307837323635363337343245373036453637),
(6, 'abcrxy@email.com', 'Hjkl!789', '조지아', 0x696D6167652E706E67),
(7, 'mnopqr@email.com', 'TuvWx!90', '최민주', 0x696D6167652E706E67),
(8, 'stuvwx@email.com', 'Yzab!234', '이영희', 0x696D6167652E706E67),
(9, 'cdefgh@email.com', 'Cdef!567', '강현우', 0x696D6167652E706E67),
(10, 'ijklmn@email.com', 'Ghij!890', '윤성민', 0x696D6167652E706E67);

mysql> select * from users;
+--------+-------------------+-----------+--------------------+----------------------------------------+
| userId | email             | password  | nickName           | chooseFile                             |
+--------+-------------------+-----------+--------------------+----------------------------------------+
|      1 | email@email.com   | ASdf12**  | 스타트업코드       | 0x307837323635363337343245373036453637 |
|      2 | kacls@email.com   | Kakao12!! | 카클스             | 0x307837323635363337343245373036453637 |
|      3 | rlfls98@naver.com | asDF12@@  | rlfls98            | 0x307837323635363337343245373036453637 |
|      4 | hhrsxz@email.com  | B*rT6j!2  | 집에가고싶다       | 0x307837323635363337343245373036453637 |
|      5 | xvqplk@email.com  | a$Df1234  | S개발자            | 0x307837323635363337343245373036453637 |
|      6 | abcrxy@email.com  | Hjkl!789  | 조지아             | 0x696D6167652E706E67                   |
|      7 | mnopqr@email.com  | TuvWx!90  | 최민주             | 0x696D6167652E706E67                   |
|      8 | stuvwx@email.com  | Yzab!234  | 이영희             | 0x696D6167652E706E67                   |
|      9 | cdefgh@email.com  | Cdef!567  | 강현우             | 0x696D6167652E706E67                   |
|     10 | ijklmn@email.com  | Ghij!890  | 윤성민             | 0x696D6167652E706E67                   |
+--------+-------------------+-----------+--------------------+----------------------------------------+


mysql> DESCRIBE users;
+------------+-------------+------+-----+---------+----------------+
| Field      | Type        | Null | Key | Default | Extra          |
+------------+-------------+------+-----+---------+----------------+
| userId     | int         | NO   | PRI | NULL    | auto_increment |
| email      | varchar(50) | NO   |     | NULL    |                |
| password   | varchar(20) | NO   |     | NULL    |                |
| nickName   | varchar(10) | YES  | UNI | NULL    |                |
| chooseFile | longblob    | YES  |     | NULL    |                |
+------------+-------------+------+-----+---------+----------------+


이미지 이름을 코드로 변환
UPDATE users
SET chooseFile = CONCAT('0x', HEX('default.png'))
WHERE chooseFile IS NULL;

한꺼번에 수정
mysql> UPDATE users SET chooseFile = CONCAT('0x', HEX('choonsik.jpg')) WHERE userId IN (1, 2);