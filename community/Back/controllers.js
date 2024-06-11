const fs = require('fs');
const { readData, writeData } = require('./models');

const login = (req, res) => {
    const { email, password } = req.body;
    const data = readData();
    if (!data) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
    const user = data.users.find(user => user.email === email && user.password === password);
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid email or password' });
    }
};

const createUser = (req, res) => {
    const { email, password, nickName, chooseFile } = req.body;
    const data = readData();
    if (!data) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
    const newUserId = data.users.length ? data.users[data.users.length - 1].userId + 1 : 1;
    const newUser = {
        userId: newUserId,
        email,
        password,
        nickName,
        chooseFile
    };

    data.users.push(newUser);
    writeData(data);
    res.json({ success: true, user: newUser });
};

const deleteUser = (req, res) => {
    const { userId } = req.params;
    const data = readData();
    if (!data) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
    const userIndex = data.users.findIndex(user => user.userId === parseInt(userId));
    if (userIndex === -1) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
    }
    data.users.splice(userIndex, 1);
    writeData(data);
    res.json({ success: true, message: 'User deleted successfully' });
};

const updateUser = (req, res) => {
    const { userId } = req.params;
    const { email, password, nickName, chooseFile } = req.body;
    const data = readData();
    if (!data) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
    const user = data.users.find(user => user.userId === parseInt(userId));
    if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
    }
    if (email) user.email = email;
    if (password) user.password = password;
    if (nickName) user.nickName = nickName;
    if (chooseFile) user.chooseFile = chooseFile;
    writeData(data);
    res.json({ success: true, user });
};

const getAllPosts = (req, res) => {
    const data = readData();
    if (!data) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
    res.json(data.posts);
};

const getPostById = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const data = readData();
    if (!data) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
    const post = data.posts.find(post => post.postId === postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ success: false, message: 'Post not found' });
    }
};

const createPost = (req, res) => {
    const newPost = req.body;
    const data = readData();
    if (!data) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
    newPost.postId = data.posts.length + 1;
    data.posts.push(newPost);
    writeData(data);
    res.json({ success: true, post: newPost });
};

const updatePost = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const updatedPost = req.body;
    const data = readData();
    if (!data) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
    const postIndex = data.posts.findIndex(post => post.postId === postId);
    if (postIndex !== -1) {
        data.posts[postIndex] = { ...data.posts[postIndex], ...updatedPost };
        writeData(data);
        res.json({ success: true, post: data.posts[postIndex] });
    } else {
        res.status(404).json({ success: false, message: 'Post not found' });
    }
};

const deletePost = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const data = readData();
    if (!data) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
    const postIndex = data.posts.findIndex(post => post.postId === postId);
    if (postIndex === -1) {
        res.status(404).json({ success: false, message: 'Post not found' });
        return;
    }
    data.posts.splice(postIndex, 1);
    writeData(data);
    res.json({ success: true });
};

const getCommentsByPostId = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const data = readData();
    if (!data) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
    const comments = data.comments.filter(comment => comment.postId === postId);
    res.json(comments);
};

const createComment = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const newComment = req.body;
    const data = readData();
    if (!data) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
    newComment.commentId = data.comments.length + 1;
    newComment.postId = postId;
    data.comments.push(newComment);
    writeData(data);
    res.json({ success: true, comment: newComment });
};

const updateComment = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const updatedComment = req.body;
    const data = readData();
    if (!data) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
    const commentIndex = data.comments.findIndex(comment => comment.commentId === commentId && comment.postId === postId);
    if (commentIndex === -1) {
        res.status(404).json({ success: false, message: 'Comment not found' });
        return;
    }
    data.comments[commentIndex] = { ...data.comments[commentIndex], ...updatedComment };
    writeData(data);
    res.json({ success: true, comment: data.comments[commentIndex] });
};

const deleteComment = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const data = readData();
    if (!data) {
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
    const commentIndex = data.comments.findIndex(comment => comment.commentId === commentId && comment.postId === postId);
    if (commentIndex === -1) {
        res.status(404).json({ success: false, message: 'Comment not found' });
        return;
    }
    data.comments.splice(commentIndex, 1);
    writeData(data);
    res.json({ success: true });
};

module.exports = {
    login,
    createUser,
    deleteUser,
    updateUser,
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getCommentsByPostId,
    createComment,
    updateComment,
    deleteComment
};
