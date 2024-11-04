import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes.js';
import connection from './mysql.js';

const app = express();
const PORT = 3000;

const corsOptions = {
    origin: 'http://localhost:8000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', router);

//<--MySQL 연결-->
// MySQL 연결
connection.connect(err => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        return;
    }
    console.log('MySQL 연결 성공');
});

// 모든 유저 가져오기
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM Users', (error, results) => {
        if (error) {
            console.error('쿼리 실패:', error);
            res.status(500).send('서버 오류');
            return;
        }
        res.json(results);
    });
});

// 회원가입 처리
app.post('/create', (req, res) => {
    const { email, password, nickName, chooseFile } = req.body;

    const newUser = {
        email,
        password,
        nickName,
        chooseFile
    };

    const query = 'INSERT INTO Users (email, password, nickName, chooseFile) VALUES (?, ?, ?, ?)';
    connection.query(query, [newUser.email, newUser.password, newUser.nickName, newUser.chooseFile], (error, results, fields) => {
        if (error) {
            console.error('유저 생성 실패:', error);
            res.status(500).send('서버 오류');
            return;
        }
        res.json({ success: true, user: newUser });
    });
});

// 유저 삭제 처리
app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const query = 'DELETE FROM Users WHERE id = ?';
    connection.query(query, [userId], (error, results) => {
        if (error) {
            console.error('유저 삭제 실패:', error);
            res.status(500).send('서버 오류');
            return;
        }
        res.json({ success: true, message: 'User deleted successfully' });
    });
});

// 유저 정보 수정 처리
app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { email, password, nickName, chooseFile } = req.body;

    const query = 'UPDATE Users SET email = ?, password = ?, nickName = ?, chooseFile = ? WHERE id = ?';
    connection.query(query, [email, password, nickName, chooseFile, userId], (error, results) => {
        if (error) {
            console.error('유저 수정 실패:', error);
            res.status(500).send('서버 오류');
            return;
        }
        res.json({ success: true, message: 'User updated successfully' });
    });
});
//<--MySQL 연결-->

// // 데이터 파일 경로
// const dbFilePath = path.join(__dirname, 'DB.json');

// // 데이터 읽기 함수
// const readData = () => {
//     try {
//         const data = fs.readFileSync(dbFilePath, 'utf8');
//         return JSON.parse(data);
//     } catch (err) {
//         console.error('Error reading JSON data:', err);
//         throw err;
//     }
// };

// // 데이터 쓰기 함수
// const writeData = (data) => {
//     fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
// };

// // 로그인 처리
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     const db = readData();
//     const user = db.users.find(user => user.email === email && user.password === password);
//     if (user) {
//         res.json({ success: true });
//     } else {
//         res.json({ success: false, message: 'Invalid email or password' });
//     }
// });

// // 회원가입 처리
// app.post('/create', (req, res) => {
//     const { email, password, nickName, chooseFile } = req.body;
//     const db = readData();
//     const newUserId = db.users.length ? db.users[db.users.length - 1].userId + 1 : 1;
//     const newUser = {
//         userId: newUserId,
//         email,
//         password,
//         nickName,
//         chooseFile
//     };

//     db.users.push(newUser);
//     writeData(db);

//     res.json({ success: true, user: newUser });
// });

// // 유저 삭제 처리
// app.delete('/users/:userId', (req, res) => {
//     const { userId } = req.params;
//     const db = readData();
//     const userIndex = db.users.findIndex(user => user.userId === parseInt(userId));

//     if (userIndex === -1) {
//         res.status(404).json({ success: false, message: 'User not found' });
//         return;
//     }

//     db.users.splice(userIndex, 1);
//     writeData(db);

//     res.json({ success: true, message: 'User deleted successfully' });
// });

// // 유저 정보 수정 처리
// app.patch('/users/:userId', (req, res) => {
//     const { userId } = req.params;
//     const { email, password, nickName, chooseFile } = req.body;
//     const db = readData();
//     const user = db.users.find(user => user.userId === parseInt(userId));

//     if (!user) {
//         res.status(404).json({ success: false, message: 'User not found' });
//         return;
//     }

//     if (email) user.email = email;
//     if (password) user.password = password;
//     if (nickName) user.nickName = nickName;
//     if (chooseFile) user.chooseFile = chooseFile;

//     writeData(db);
//     res.json({ success: true, user });
// });

// // 게시글 목록 조회
// app.get('/posts', (req, res) => {
//     const db = readData();
//     res.json(db.posts);
// });

// // 게시글 상세 조회
// app.get('/posts/:postId', (req, res) => {
//     const postId = parseInt(req.params.postId, 10);
//     const db = readData();
//     const post = db.posts.find(post => post.postId === postId);
//     if (post) {
//         res.json(post);
//     } else {
//         res.status(404).json({ success: false, message: 'Post not found' });
//     }
// });

// // 댓글 조회
// app.get('/posts/:postId/comments', (req, res) => {
//     try {
//         const postId = parseInt(req.params.postId, 10);
//         const db = readData();
//         const comments = db.comments.filter(comment => comment.postId === postId);
//         res.json(comments);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to get comments' });
//     }
// });


// // 댓글 등록
// app.post('/posts/:postId/comments', (req, res) => {
//     const postId = parseInt(req.params.postId, 10);
//     const newComment = req.body;
//     const db = readData();
//     newComment.commentId = db.comments.length + 1;
//     newComment.postId = postId;
//     db.comments.push(newComment);

//     writeData(db);
//     res.json({ success: true, comment: newComment });
// });

// // 게시글 등록
// app.post('/posts', (req, res) => {
//     const newPost = req.body;
//     const db = readData();
//     newPost.postId = db.posts.length + 1;
//     db.posts.push(newPost);

//     writeData(db);
//     res.json({ success: true, post: newPost });
// });

// // 게시글 수정
// app.patch('/posts/:postId', (req, res) => {
//     const postId = parseInt(req.params.postId, 10);
//     const updatedPost = req.body;
//     const db = readData();
//     const postIndex = db.posts.findIndex(post => post.postId === postId);

//     if (postIndex !== -1) {
//         db.posts[postIndex] = { ...db.posts[postIndex], ...updatedPost };
//         writeData(db);
//         res.json({ success: true, post: db.posts[postIndex] });
//     } else {
//         res.status(404).json({ success: false, message: 'Post not found' });
//     }
// });

// // 게시글 삭제
// app.delete('/posts/:postId', (req, res) => {
//     const postId = parseInt(req.params.postId, 10);
//     const db = readData();
//     const postIndex = db.posts.findIndex(post => post.postId === postId);

//     if (postIndex === -1) {
//         res.status(404).json({ success: false, message: 'Post not found' });
//         return;
//     }

//     db.posts.splice(postIndex, 1);
//     writeData(db);
//     res.json({ success: true });
// });

// // 댓글 수정
// app.patch('/posts/:postId/comments/:commentId', (req, res) => {
//     const postId = parseInt(req.params.postId, 10);
//     const commentId = parseInt(req.params.commentId, 10);
//     const updatedComment = req.body;
//     const db = readData();
//     const commentIndex = db.comments.findIndex(comment => comment.commentId === commentId && comment.postId === postId);

//     if (commentIndex === -1) {
//         res.status(404).json({ success: false, message: 'Comment not found' });
//         return;
//     }

//     db.comments[commentIndex] = { ...db.comments[commentIndex], ...updatedComment };
//     writeData(db);
//     res.json({ success: true, comment: db.comments[commentIndex] });
// });

// // 댓글 삭제
// app.delete('/posts/:postId/comments/:commentId', (req, res) => {
//     fs.readFile(dbFilePath, 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).json({ success: false, message: 'Internal server error' });
//         }

//         const db = JSON.parse(data);
//         const postId = parseInt(req.params.postId);
//         const commentId = parseInt(req.params.commentId);

//         const commentIndex = db.comments.findIndex(comment => comment.commentId === commentId && comment.postId === postId);

//         if (commentIndex === -1) {
//             return res.status(404).json({ success: false, message: 'Comment not found' });
//         }

//         db.comments.splice(commentIndex, 1);

//         fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Failed to update database' });
//             }
//             res.json({ success: true, message: 'Comment deleted' });
//         });
//     });
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});