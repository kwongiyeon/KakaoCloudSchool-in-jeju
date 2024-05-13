const fs = require('fs');
const path = require('path');
// import cors from 'cors';

const app = express();
const __dirname = path.resolve();
const PORT = 5500;

app.use(express.static(path.join(__dirname, './')))
app.use(cors());

app.get("/login", (req, res) => {
  console.log(req.headers);
  let {email, userPassword} = req.query;
  console.log(email,userPassword);
  res.sendFile(path.join(__dirname, "login.html")); // 1. login.html 경로
});

app.get("/create", (req, res) => {
  console.log(req.headers);
  let {chooseFile, email, userPassword, nickName} = req.query;
  console.log(chooseFile, email, userPassword, nickName);
  res.sendFile(path.join(__dirname, "create.html")); // 2. create.html 경로
});

app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "main.html")); // 3. main.html 경로
});

app.get("/detail", (req, res) => {
  console.log(req.headers);
  let {comment} = req.query;
  console.log(comment);
  res.sendFile(path.join(__dirname, "detail.html")); // 4. detail.html 경로
});

app.get("/posting", (req, res) => {
  console.log(req.headers);
  let {title, content, chooseFile} = req.query;
  console.log(title, content, chooseFile);
  res.sendFile(path.join(__dirname, "posting.html")); // 5. posting.html 경로
});

app.get("/postupdate", (req, res) => {
  console.log(req.headers);
  let {content, chooseFile} = req.query;
  console.log(content, chooseFile);
  res.sendFile(path.join(__dirname, "postupdate.html")); // 6. postupdate.html 경로
});

app.get("/update", (req, res) => {
  console.log(req.headers);
  let {chooseFile, nickName} = req.query;
  console.log(chooseFile, nickName);
  res.sendFile(path.join(__dirname, "update.html")); // 7. update.html 경로
});

app.get("/pwchange", (req, res) => {
  console.log(req.headers);
  let {userPassword} = req.query;
  console.log(userPassword);
  res.sendFile(path.join(__dirname, "pwchange.html")); // 8. pwchange.html 경로
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});