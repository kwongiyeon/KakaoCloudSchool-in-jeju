import users from '../models/users.js';
import model from '../models/users.js'

const userController = {
  // 모든 사용자 가져오기
  getAllUsers: (req, res) => {
    const allUsers = userModel.getAllUsers();
    res.json(allUsers);
  },

  // 사용자 이메일로 가져오기
  getUserByEmail: (req, res) => {
    const { email } = req.params;
    const user = userModel.getUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  },

  // 사용자 추가하기
  addUser: (req, res) => {
    const newUser = req.body;
    const addedUser = userModel.addUser(newUser);
    res.status(201).json(addedUser);
  },

  // 사용자 정보 업데이트하기
  updateUser: (req, res) => {
    const { email } = req.params;
    const updatedUser = req.body;
    const result = userModel.updateUser(email, updatedUser);
    if (result) {
      res.json({ message: '사용자 정보가 업데이트되었습니다.' });
    } else {
      res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  },

  // 사용자 삭제하기
  deleteUser: (req, res) => {
    const { email } = req.params;
    const result = userModel.deleteUser(email);
    if (result) {
      res.json({ message: '사용자가 삭제되었습니다.' });
    } else {
      res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  }
};

  
function getUsers(req, res) {
    res.send(Users);
}

function getUser(req, res) {
    const userId = Number(req.params.userId);
    const user = Users.find((user) => user.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
}

function postUser(req, res) {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Missing user name' });
    }

    const newUser = {
        name: req.body.name,
        id: Users.length,
    };
    Users.push(newUser);
    res.json(newUser);
}

// 해당 함수를 외부에 공개한다.
module.exports = {
    getUsers,
    getUser,
    postUser,
};