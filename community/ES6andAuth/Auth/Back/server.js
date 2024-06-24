import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const PORT = 3000;

const corsOptions = {
    origin: 'http://localhost:8000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: false }
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // 정적 파일 제공

const readUserData = () => {
    const data = fs.readFileSync(path.join(__dirname, 'DB.json'), 'utf8');
    return JSON.parse(data).users;
};

app.post('/login', (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).json({
            status: 400,
            message: '이메일 또는 패스워드를 입력해주세요.',
            data: null,
        });
    }

    const users = readUserData();
    const user = users.find(user => user.email === email && user.password === password);

    if (user && user.password === password) {
        request.session.user = { email: user.email, nickName: user.nickName, chooseFile: user.chooseFile };
        response.cookie('user', JSON.stringify(user), { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: false });
        return response.status(200).json({
            status: 200,
            message: `환영합니다, ${email}님!`,
            data: { sessionID: request.sessionID },
        });
    } else {
        return response.status(401).json({
            status: 401,
            message: '이메일 또는 패스워드가 잘못되었습니다.',
            data: null,
        });
    }
});

// 로그아웃 API
app.get('/logout', (request, response) => {
    response.clearCookie('connect.sid');
    response.clearCookie('user');
    request.session.destroy(error => {
        if (error) {
            return response.status(500).json({
                status: 500,
                message: '로그아웃 중 문제가 발생했습니다.',
                data: null,
            });
        }

        return response.status(200).json({
            status: 200,
            message: '성공적으로 로그아웃되었습니다.',
            data: null,
        });
    });
});

app.get('/session', (req, res) => {
    if (req.session.user) {
        return res.json({ user: req.session.user });
    } else {
        return res.status(401).json({ message: '사용자가 로그인되어 있지 않습니다.' });
    }
});

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});