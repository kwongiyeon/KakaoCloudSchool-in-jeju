-- CREATE TABLE ChangeLog (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     tableName VARCHAR(255),
--     action VARCHAR(255),
--     rowId INT,
--     changeTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- DELIMITER //

-- CREATE TRIGGER after_user_insert
-- AFTER INSERT ON users
-- FOR EACH ROW
-- BEGIN
-- INSERT INTO ChangeLog (tableName, action, rowId) VALUES ('users', 'INSERT', NEW.userId);
-- END;
-- //

-- CREATE TRIGGER after_user_update
-- AFTER UPDATE ON users
-- FOR EACH ROW
-- BEGIN
-- INSERT INTO ChangeLog (tableName, action, rowId) VALUES ('users', 'UPDATE', NEW.userId);
-- END;
-- //

-- CREATE TRIGGER after_user_delete
-- AFTER DELETE ON users
-- FOR EACH ROW
-- BEGIN
-- INSERT INTO ChangeLog (tableName, action, rowId) VALUES ('users', 'DELETE', OLD.userId);
-- END;
-- //

-- DELIMITER ;

-- -----------------------------------------------------------------------------------------------
-- 댓글 수 증가 트리거

DELIMITER $$
CREATE TRIGGER after_comment_insert
AFTER INSERT ON comments
FOR EACH ROW
BEGIN
    UPDATE posts
    SET comment_count = comment_count + 1
    WHERE id = NEW.postId;
END $$
DELIMITER;

-- -----------------------------------------------------------------------------------------------
-- 댓글 수 감소 트리거

DELIMITER $$

CREATE TRIGGER after_comment_delete
AFTER DELETE 
ON comments
FOR EACH ROW
BEGIN
    UPDATE posts
    SET comment_count = comment_count - 1
    WHERE id = OLD.postId;
END $$

DELIMITER;