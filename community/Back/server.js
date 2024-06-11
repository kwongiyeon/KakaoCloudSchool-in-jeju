const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = 3000;

const corsOptions = {
    origin: 'http://localhost:8000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

// require.main.filename을 사용하여 디렉터리 설정
const mainFilename = require.main.filename;
const mainDirname = path.dirname(mainFilename);

const dbFilePath = path.join(mainDirname, 'DB.json');

app.use(express.json());
app.use(cors(corsOptions));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
