import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, 'DB.json');

const readData = () => {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
};

const { users, posts, comments } = readData();

export const getAllUsers = () => users;
export const getUserByEmail = (email) => users.find(user => user.email === email);
export const createUser = (userData) => {
    users.push(userData);
    writeData({ users, posts, comments });
};
export const updateUser = (email, updatedUserData) => {
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUserData };
        writeData({ users, posts, comments });
    }
};
export const deleteUser = (email) => {
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        writeData({ users, posts, comments });
    }
};

export const getAllPosts = () => posts;
export const getPostById = (postId) => posts.find(post => post.postId === postId);
export const createPost = (postData) => {
    posts.push(postData);
    writeData({ users, posts, comments });
};
export const updatePost = (postId, updatedPostData) => {
    const postIndex = posts.findIndex(post => post.postId === postId);
    if (postIndex !== -1) {
        posts[postIndex] = { ...posts[postIndex], ...updatedPostData };
        writeData({ users, posts, comments });
    }
};
export const deletePost = (postId) => {
    const postIndex = posts.findIndex(post => post.postId === postId);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        writeData({ users, posts, comments });
    }
};

export const getAllComments = () => comments;
export const getCommentsByPostId = (postId) => comments.filter(comment => comment.postId === postId);
export const createComment = (commentData) => {
    comments.push(commentData);
    writeData({ users, posts, comments });
};
export const updateComment = (commentId, updatedCommentData) => {
    const commentIndex = comments.findIndex(comment => comment.commentId === commentId);
    if (commentIndex !== -1) {
        comments[commentIndex] = { ...comments[commentIndex], ...updatedCommentData };
        writeData({ users, posts, comments });
    }
};
export const deleteComment = (commentId) => {
    const commentIndex = comments.findIndex(comment => comment.commentId === commentId);
    if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
        writeData({ users, posts, comments });
    }
};
