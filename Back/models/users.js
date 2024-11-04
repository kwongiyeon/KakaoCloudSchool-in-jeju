import fs from 'fs';
import path from 'path';
import { users } from './Front/DB.json';

// 사용자 목록 조회
exports.getAllUsers = () => {
    return users;
};

// 사용자 이메일로 조회
exports.getUserByEmail = (email) => {
    return users.find(user => user.email === email);
};

// 사용자 ID로 조회
exports.getUserById = (userId) => {
    return users.find(user => user.user_id === userId);
};

// 새로운 사용자 생성
exports.createUser = (userData) => {
    // userData에는 새로운 사용자의 정보가 포함되어 있어야 합니다.
    // 여기서는 간단하게 사용자 목록에 추가하는 것으로 가정합니다.
    users.push(userData);
};

// 사용자 정보 업데이트
exports.updateUser = (userId, updatedUserData) => {
    // userId에 해당하는 사용자를 찾아서 업데이트합니다.
    // 여기서는 사용자 목록에서 해당 사용자를 찾아 업데이트하는 것으로 가정합니다.
    const index = users.findIndex(user => user.user_id === userId);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUserData };
    }
};

// 사용자 삭제
exports.deleteUser = (userId) => {
    // userId에 해당하는 사용자를 삭제합니다.
    // 여기서는 사용자 목록에서 해당 사용자를 찾아 삭제하는 것으로 가정합니다.
    const index = users.findIndex(user => user.user_id === userId);
    if (index !== -1) {
        users.splice(index, 1);
    }
};


export default {
    getUsers,
    getUser,
    postUser
}