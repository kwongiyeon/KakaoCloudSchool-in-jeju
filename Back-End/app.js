import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


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


// 데이터 파일 경로
const dbFilePath = path.join(__dirname, 'DB.json');

// 데이터 읽기 함수
const readData = () => {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
};

// 데이터 쓰기 함수
const writeData = (data) => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// 로그인 처리
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const dbFilePath = path.join(__dirname, 'DB.json');
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        const db = JSON.parse(data);
        const user = db.users.find(user => user.email === email && user.password === password);
        if (user) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    });
});

// 회원가입 처리
app.post('/create', (req, res) => {
    const { email, password, nickName, chooseFile } = req.body;

    const dbFilePath = path.join(__dirname, 'DB.json');
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }

        const db = JSON.parse(data);
        const newUserId = db.users.length ? db.users[db.users.length - 1].userId + 1 : 1;
        const newUser = {
            userId: newUserId,
            email,
            password,
            nickName,
            chooseFile
        };

        db.users.push(newUser);

        fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to DB file:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return;
            }

            res.json({ success: true, user: newUser });
        });
    });
});

// 유저 삭제 처리
app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const dbFilePath = path.join(__dirname, 'DB.json');
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }

        const db = JSON.parse(data);
        const userIndex = db.users.findIndex(user => user.userId === parseInt(userId));

        if (userIndex === -1) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        db.users.splice(userIndex, 1);

        fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to DB file:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return;
            }

            res.json({ success: true, message: 'User deleted successfully' });
        });
    });
});

// 유저 정보 수정 처리
app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { email, password, nickName, chooseFile } = req.body;

    const dbFilePath = path.join(__dirname, 'DB.json');
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }

        const db = JSON.parse(data);
        const user = db.users.find(user => user.userId === parseInt(userId));

        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        if (email) user.email = email;
        if (password) user.password = password;
        if (nickName) user.nickName = nickName;
        if (chooseFile) user.chooseFile = chooseFile;

        fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to DB file:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return;
            }

            res.json({ success: true, user });
        });
    });
});

// 게시글 목록 조회
app.get('/posts', (req, res) => {
    const dbFilePath = path.join(__dirname, 'DB.json');
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        const db = JSON.parse(data);
        res.json(db.posts);
    });
});

// 게시글 상세 조회
app.get('/posts/:postId', (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const dbFilePath = path.join(__dirname, 'DB.json');
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        const db = JSON.parse(data);
        const post = db.posts.find(post => post.postId === postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ success: false, message: 'Post not found' });
        }
    });
});

// 댓글 조회
app.get('/posts/:postId/comments', (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const dbFilePath = path.join(__dirname, 'DB.json');
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        const db = JSON.parse(data);
        const comments = db.comments.filter(comment => comment.postId === postId);
        res.json(comments);
    });
});

// 댓글 등록
app.post('/posts/:postId/comments', (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const newComment = req.body;
    const dbFilePath = path.join(__dirname, 'DB.json');
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        const db = JSON.parse(data);
        newComment.commentId = db.comments.length + 1;
        newComment.postId = postId;
        db.comments.push(newComment);

        fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error('Error writing to DB file:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return;
            }
            res.json({ success: true, comment: newComment });
        });
    });
});

// 게시글 등록
app.post('/posts', (req, res) => {
    const newPost = req.body;
    const dbFilePath = path.join(__dirname, 'DB.json');
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        const db = JSON.parse(data);
        newPost.postId = db.posts.length + 1;
        db.posts.push(newPost);

        fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error('Error writing to DB file:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return;
            }
            res.json({ success: true, post: newPost });
        });
    });
});

// 게시글 수정
app.patch('/posts/:postId', (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const updatedPost = req.body;

    let data = readData();
    const postIndex = data.posts.findIndex(post => post.postId === postId);

    if (postIndex !== -1) {
        data.posts[postIndex] = { ...data.posts[postIndex], ...updatedPost };
        writeData(data);
        res.json({ success: true, post: data.posts[postIndex] });
    } else {
        res.status(404).json({ success: false, message: 'Post not found' });
    }
});

// 게시글 삭제
app.delete('/posts/:postId', (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const dbFilePath = path.join(__dirname, 'DB.json');
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        const db = JSON.parse(data);
        const postIndex = db.posts.findIndex(post => post.post_id === postId);
        if (postIndex === -1) {
            res.status(404).json({ success: false, message: 'Post not found' });
            return;
        }
        db.posts.splice(postIndex, 1);
        fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error('Error writing to DB file:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return;
            }
            res.json({ success: true });
        });
    });
});

// 댓글 수정
app.patch('/posts/:postId/comments/:commentId', (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const updatedComment = req.body;
    const dbFilePath = path.join(__dirname, 'DB.json');
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        const db = JSON.parse(data);
        const commentIndex = db.comments.findIndex(comment => comment.commentId === commentId && comment.postId === postId);
        if (commentIndex === -1) {
            res.status(404).json({ success: false, message: 'Comment not found' });
            return;
        }
        db.comments[commentIndex] = { ...db.comments[commentIndex], ...updatedComment };
        fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error('Error writing to DB file:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return;
            }
            res.json({ success: true, comment: db.comments[commentIndex] });
        });
    });
});

// 댓글 삭제
app.delete('/posts/:postId/comments/:commentId', (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const dbFilePath = path.join(__dirname, 'DB.json');
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        const db = JSON.parse(data);
        const commentIndex = db.comments.findIndex(comment => comment.comment_id === commentId && comment.postId === postId);
        if (commentIndex === -1) {
            res.status(404).json({ success: false, message: 'Comment not found' });
            return;
        }
        db.comments.splice(commentIndex, 1);
        fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error('Error writing to DB file:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return;
            }
            res.json({ success: true });
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});