const fs = require('fs');
const path = require('path');

// 데이터 파일 경로
const dbFilePath = path.join(__dirname, 'DB.json');

// 데이터 읽기 함수
const readData = () => {
    try {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data from DB.json:', error);
        return null;
    }
};

// 데이터 쓰기 함수
const writeData = (data) => {
    try {
        fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing data to DB.json:', error);
    }
};

const getAllUsers = () => readData().users;
const getUserByEmail = (email) => readData().users.find(user => user.email === email);
const createUser = (userData) => {
    const data = readData();
    data.users.push(userData);
    writeData(data);
};
const updateUser = (email, updatedUserData) => {
    const data = readData();
    const userIndex = data.users.findIndex(user => user.email === email);
    if (userIndex !== -1) {
        data.users[userIndex] = { ...data.users[userIndex], ...updatedUserData };
        writeData(data);
    }
};
const deleteUser = (email) => {
    const data = readData();
    const userIndex = data.users.findIndex(user => user.email === email);
    if (userIndex !== -1) {
        data.users.splice(userIndex, 1);
        writeData(data);
    }
};

const getAllPosts = () => readData().posts;
const getPostById = (postId) => readData().posts.find(post => post.postId === postId);
const createPost = (postData) => {
    const data = readData();
    postData.postId = data.posts.length ? data.posts[data.posts.length - 1].postId + 1 : 1;
    data.posts.push(postData);
    writeData(data);
};
const updatePost = (postId, updatedPostData) => {
    const data = readData();
    const postIndex = data.posts.findIndex(post => post.postId === postId);
    if (postIndex !== -1) {
        data.posts[postIndex] = { ...data.posts[postIndex], ...updatedPostData };
        writeData(data);
    }
};
const deletePost = (postId) => {
    const data = readData();
    const postIndex = data.posts.findIndex(post => post.postId === postId);
    if (postIndex !== -1) {
        data.posts.splice(postIndex, 1);
        writeData(data);
    }
};

const getAllComments = () => readData().comments;
const getCommentsByPostId = (postId) => readData().comments.filter(comment => comment.postId === postId);
const createComment = (commentData) => {
    const data = readData();
    commentData.commentId = data.comments.length ? data.comments[data.comments.length - 1].commentId + 1 : 1;
    data.comments.push(commentData);
    writeData(data);
};
const updateComment = (commentId, updatedCommentData) => {
    const data = readData();
    const commentIndex = data.comments.findIndex(comment => comment.commentId === commentId);
    if (commentIndex !== -1) {
        data.comments[commentIndex] = { ...data.comments[commentIndex], ...updatedCommentData };
        writeData(data);
    }
};
const deleteComment = (commentId) => {
    const data = readData();
    const commentIndex = data.comments.findIndex(comment => comment.commentId === commentId);
    if (commentIndex !== -1) {
        data.comments.splice(commentIndex, 1);
        writeData(data);
    }
};

module.exports = {
    readData,
    writeData,
    getAllUsers,
    getUserByEmail,
    createUser,
    updateUser,
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
    deleteComment
};