import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import path from 'path';
import routes from './routes.js'

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());
app.use(methodOverride('_method'));
// app.use(express.static(path.join(__dirname, '../Front')));

app.use(routes);
// app.use('/users', userRouter);
// app.use('/posts', postRouter);
// app.use('/comments', commentRouter);
app.get('/login')
// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// **터미널에서 node app.js 입력하고 실행**