mysql> START TRANSACTION;

mysql> INSERT INTO USERS (userId, email, password, nickName, chooseFile) VALUES (22, 'ganadara@email.com', 'gana&4989', '가나다라', NULL);

mysql> select * from users;

mysql> UPDATE users SET nickName = 'email' WHERE userId = 1;

mysql> select * from users;

mysql> COMMIT;

mysql> ROLLBACK;