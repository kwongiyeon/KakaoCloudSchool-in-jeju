import express from 'express';
import { userController, postController, commentController } from './controllers.js';

const router = express.Router();

// 로그인 관련 라우트
router.post('/login', userController.login);

// 사용자 관련 라우트
router.get('/users', userController.getAllUsers);
router.get('/users/:email', userController.getUserByEmail);
router.post('/users', userController.addUser);
router.patch('/users', userController.updateUser);
router.delete('/users/:email', userController.deleteUser);

// 게시물 관련 라우트
router.get('/posts', postController.getAllPosts);
router.get('/posts/:postId', postController.getPostById);
router.post('/posts', postController.addPost);
router.patch('/posts/:postId', postController.updatePost);
router.delete('/posts/:postId', postController.deletePost);

// 댓글 관련 라우트
router.get('/posts/:postId/comments', commentController.getCommentsByPostId);
router.post('/posts/:postId/comments', commentController.createComment);
router.patch('/posts/:postId/comments/:commentId', commentController.updateComment);
router.delete('/posts/:postId/comments/:commentId', commentController.deleteComment);

export default router;
