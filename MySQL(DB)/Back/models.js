import connection from './mysql.js';

// 사용자 관련 함수들
const getAllUsers = (callback) => {
    connection.query('SELECT * FROM Users', (error, results) => {
        if (error) return callback(error);
        results.forEach(user => {
            if (user.chooseFile) {
                user.chooseFile = `${user.chooseFile}`;
            }
        });
        callback(null, results);
    });
};

const getUserByEmail = (email, callback) => {
    connection.query('SELECT * FROM Users WHERE email = ?', [email], (error, results) => {
        if (error) return callback(error);
        const user = results[0];
        if (user && user.chooseFile) {
            user.chooseFile = `${user.chooseFile}`;
        }
        callback(null, user);
    });
};

const createUser = (userData, callback) => {
    const query = 'INSERT INTO Users (email, password, nickName, chooseFile) VALUES (?, ?, ?, ?)';
    connection.query(query, [userData.email, userData.password, userData.nickName, userData.chooseFile], (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};

const updateUserInfo = (email, updatedUserData, callback) => {
    const query = 'UPDATE Users SET nickName = ?, chooseFile = ? WHERE email = ?';
    connection.query(query, [updatedUserData.nickName, updatedUserData.chooseFile, email], (error, results) => {
        if (error) {
            console.error('Error updating user info:', error);
            return callback(error);
        }
        callback(null, results);
    });
};

const updateUserPassword = (email, newPassword, callback) => {
    const query = 'UPDATE Users SET password = ? WHERE email = ?';
    connection.query(query, [newPassword, email], (error, results) => {
        if (error) {
            console.error('Error updating user password:', error);
            return callback(error);
        }
        callback(null, results);
    });
};

const deleteUser = (email, callback) => {
    const query = 'DELETE FROM Users WHERE email = ?';
    connection.query(query, [email], (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};

// 게시물 관련 함수들
const getAllPosts = (callback) => {
    const query = `
        SELECT p.*, u.nickName 
        FROM Posts p 
        JOIN Users u ON p.userId = u.userId
    `;
    connection.query(query, (error, results) => {
        if (error) return callback(error);
        results.forEach(post => {
            if (post.chooseFile) {
                post.chooseFile = `${post.chooseFile}`;
            }
        });
        callback(null, results);
    });
};

const getPostById = (postId, callback) => {
    const query = `
    SELECT p.postId, p.posttitle, p.content, u.nickName, p.datetime, p.chooseFile, p.likes, p.comments, p.views
    FROM posts p
    JOIN users u ON p.userId = u.userId WHERE p.postId = ?;
    `;
    connection.query(query, [postId], (error, results) => {
        if (error) return callback(error);
        const post = results[0];
        if (post && post.chooseFile) {
            post.chooseFile = `${post.chooseFile}`;
        }
        callback(null, post);
    });
};

const createPost = (postData, callback) => {
    console.log('Creating post with data:', postData); // 디버깅 메시지 추가

    // 먼저 nickName을 통해 userId를 조회
    const userQuery = 'SELECT userId FROM Users WHERE nickName = ?';
    connection.query(userQuery, [postData.nickName], (error, results) => {
        if (error) {
            console.error('Error querying user:', error); // 디버깅 메시지 추가
            return callback(error);
        }
        if (results.length === 0) {
            console.error('User not found for nickName:', postData.nickName); // 디버깅 메시지 추가
            return callback(new Error('User not found'));
        }

        const userId = results[0].userId;

        const query = 'INSERT INTO Posts (posttitle, content, datetime, chooseFile, likes, comments, views, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [postData.posttitle, postData.content, postData.datetime, postData.chooseFile, postData.likes, postData.comments, postData.views, userId], (error, results) => {
            if (error) {
                console.error('Error inserting post:', error); // 디버깅 메시지 추가
                return callback(error);
            }
            callback(null, results);
        });
    });
};

const updatePost = (postId, updatedPostData, callback) => {
    const query = 'UPDATE Posts SET posttitle = ?, content = ?, datetime = ?, chooseFile = ? WHERE postId = ?';
    connection.query(query, [updatedPostData.posttitle, updatedPostData.content, updatedPostData.datetime, updatedPostData.chooseFile, postId], (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};

const deletePost = (postId, callback) => {
    const query = 'DELETE FROM Posts WHERE postId = ?';
    connection.query(query, [postId], (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};

// 댓글 관련 함수들
const getAllComments = (callback) => {
    connection.query('SELECT * FROM Comments', (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};

const getCommentsByPostId = (postId, callback) => {
    const query = `
        SELECT c.commentId, c.postId, c.cmcontent, c.datetime, u.nickName 
        FROM Comments c
        JOIN Users u ON c.userId = u.userId
        WHERE c.postId = ?
    `;
    connection.query(query, [postId], (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};


const createComment = (commentData, callback) => {
    console.log('Creating comment with data:', commentData); // 디버깅 메시지 추가

    if (!commentData.nickName) {
        console.error('NickName is missing'); // 디버깅 메시지 추가
        return callback(new Error('NickName is missing'));
    }

    // 먼저 nickName을 통해 userId를 조회
    const userQuery = 'SELECT userId FROM Users WHERE nickName = ?';
    connection.query(userQuery, [commentData.nickName], (error, results) => {
        if (error) {
            console.error('Error querying user:', error); // 디버깅 메시지 추가
            return callback(error);
        }
        if (results.length === 0) {
            console.error('User not found for nickName:', commentData.nickName); // 디버깅 메시지 추가
            return callback(new Error('User not found'));
        }

        const userId = results[0].userId;
        console.log('Found userId:', userId); // 디버깅 메시지 추가

        const query = 'INSERT INTO Comments (postId, cmcontent, datetime, userId) VALUES (?, ?, ?, ?)';
        connection.query(query, [commentData.postId, commentData.cmcontent, commentData.datetime, userId], (error, results) => {
            if (error) {
                console.error('Error inserting comment:', error); // 디버깅 메시지 추가
                return callback(error);
            }
            console.log('Comment inserted successfully:', results); // 디버깅 메시지 추가
            callback(null, results);
        });
    });
};

const updateComment = (commentId, commentData, callback) => {
    const query = 'UPDATE comments SET cmcontent = ? WHERE commentId = ?';
    connection.query(query, [commentData.cmcontent, commentId], (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};

const deleteComment = (commentId, callback) => {
    const query = 'DELETE FROM Comments WHERE commentId = ?';
    connection.query(query, [commentId], (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};

const getCommentById = (commentId, callback) => {
    connection.query('SELECT * FROM Comments WHERE commentId = ?', [commentId], (error, results) => {
        if (error) return callback(error);
        callback(null, results[0]);
    });
};

export {
    getAllUsers,
    getUserByEmail,
    createUser,
    updateUserInfo,
    updateUserPassword,
    deleteUser,
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getAllComments,
    getCommentsByPostId,
    createComment,
    updateComment,
    deleteComment,
    getCommentById
};