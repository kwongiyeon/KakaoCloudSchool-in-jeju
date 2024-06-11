const express = require('express');
const {
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
} = require('./controllers');

const router = express.Router();

// 사용자 관련 라우트
router.post('/login', login);
router.post('/create', createUser);
router.delete('/users/:userId', deleteUser);
router.patch('/users/:userId', updateUser);

// 게시물 관련 라우트
router.get('/posts', getAllPosts);
router.get('/posts/:postId', getPostById);
router.post('/posts', createPost);
router.patch('/posts/:postId', updatePost);
router.delete('/posts/:postId', deletePost);

// 댓글 관련 라우트
router.get('/posts/:postId/comments', getCommentsByPostId);
router.post('/posts/:postId/comments', createComment);
router.patch('/posts/:postId/comments/:commentId', updateComment);
router.delete('/posts/:postId/comments/:commentId', deleteComment);

module.exports = router;
