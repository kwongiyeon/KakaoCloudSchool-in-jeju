CREATE TABLE comments (
    commentId INT NOT NULL AUTO_INCREMENT,
    postId INT,
    content TEXT,
    datetime DATETIME,
    userId INT,
    PRIMARY KEY (commentId),
    FOREIGN KEY (postId) REFERENCES posts(postId),
    FOREIGN KEY (userId) REFERENCES users(userId)
);

INSERT INTO comments (commentId, postId, cmcontent, datetime, userId) VALUES
(1, 1, '잘 보고 갑니다!', '2023-11-03 16:40:10', 1),
(2, 1, '좋은 글 감사합니다', '2023-11-03 16:40:10', 2),
(3, 8, '번쩍번쩍한 아이디어네요!', '2023-11-03 16:40:10', 3),
(4, 5, '나도 고양이 키우고 싶어', '2023-11-03 16:40:10', 4),
(5, 3, '서로이웃 신청했습니다~', '2023-11-03 16:40:10', 5),
(8, 11, '좋은 글 감사합니다', '2023-11-03 16:40:10', 6),
(9, 9, '잘 보고 갑니다!', '2023-11-03 16:40:10', 7),
(11, 1, '안녕하세요 반가워요^^', '2023-11-03 16:40:10', 8),
(12, 2, '카클스 하고 싶었는데 부러워요ㅜㅜ', '2023-11-03 16:40:10', 9);

mysql> select * from comments;
+-----------+--------+--------------------------------------------------+---------------------+--------+
| commentId | postId | cmcontent                                        | datetime            | userId |
+-----------+--------+--------------------------------------------------+---------------------+--------+
|         1 |      1 | 잘 보고 갑니다!                                  | 2023-11-03 16:40:10 |      1 |
|         2 |      1 | 좋은 글 감사합니다                               | 2023-11-03 16:40:10 |      2 |
|         3 |      8 | 번쩍번쩍한 아이디어네요!                         | 2023-11-03 16:40:10 |      3 |
|         4 |      5 | 나도 고양이 키우고 싶어                          | 2023-11-03 16:40:10 |      4 |
|         5 |      3 | 서로이웃 신청했습니다~                           | 2023-11-03 16:40:10 |      5 |
|         8 |     11 | 좋은 글 감사합니다                               | 2023-11-03 16:40:10 |      6 |
|         9 |      9 | 잘 보고 갑니다!                                  | 2023-11-03 16:40:10 |      7 |
|        11 |      1 | 안녕하세요 반가워요^^                            | 2023-11-03 16:40:10 |      8 |
|        12 |      2 | 카클스 하고 싶었는데 부러워요ㅜㅜ                | 2023-11-03 16:40:10 |      9 |
+-----------+--------+--------------------------------------------------+---------------------+--------+

	•	comments 테이블:
	•	commentId: 기본 키로 사용되며 자동 증가하는 정수 값
	•	postId: 게시물 ID를 참조하는 외래 키
	•	content: 댓글 내용을 저장하는 TEXT 타입의 필드
	•	datetime: 작성 날짜를 저장하는 DATETIME 타입의 필드
	•	userId: 사용자의 ID를 참조하는 외래 키

mysql> DESCRIBE comments;
+-----------+----------+------+-----+---------+----------------+
| Field     | Type     | Null | Key | Default | Extra          |
+-----------+----------+------+-----+---------+----------------+
| commentId | int      | NO   | PRI | NULL    | auto_increment |
| postId    | int      | YES  | MUL | NULL    |                |
| content   | text     | YES  |     | NULL    |                |
| datetime  | datetime | YES  |     | NULL    |                |
| userId    | int      | YES  | MUL | NULL    |                |
+-----------+----------+------+-----+---------+----------------+

comments와 users 테이블 조인으로 nickName 조회
SELECT c.commentId, c.postId, u.nickName, c.cmcontent, c.datetime
FROM comments c
JOIN users u ON c.userId = u.userId;
+-----------+--------+--------------------+--------------------------------------------------+---------------------+
| commentId | postId | nickName           | cmcontent                                        | datetime            |
+-----------+--------+--------------------+--------------------------------------------------+---------------------+
|         1 |      1 | 스타트업코드       | 잘 보고 갑니다!                                  | 2023-11-03 16:40:10 |
|         2 |      1 | 카클스             | 좋은 글 감사합니다                               | 2023-11-03 16:40:10 |
|         3 |      8 | rlfls98            | 번쩍번쩍한 아이디어네요!                         | 2023-11-03 16:40:10 |
|         4 |      5 | 집에가고싶다       | 나도 고양이 키우고 싶어                          | 2023-11-03 16:40:10 |
|         5 |      3 | S개발자            | 서로이웃 신청했습니다~                           | 2023-11-03 16:40:10 |
|         8 |     11 | 조지아             | 좋은 글 감사합니다                               | 2023-11-03 16:40:10 |
|         9 |      9 | 최민주             | 잘 보고 갑니다!                                  | 2023-11-03 16:40:10 |
|        11 |      1 | 이영희             | 안녕하세요 반가워요^^                            | 2023-11-03 16:40:10 |
|        12 |      2 | 강현우             | 카클스 하고 싶었는데 부러워요ㅜㅜ                | 2023-11-03 16:40:10 |
+-----------+--------+--------------------+--------------------------------------------------+---------------------+