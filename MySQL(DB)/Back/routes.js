import express from 'express';
import { userController, postController, commentController } from './controllers.js';

const router = express.Router();

// 로그인 관련 라우트
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// 사용자 관련 라우트
router.get('/users', userController.getAllUsers);
router.get('/users/:email', userController.getUserByEmail);
router.post('/users', userController.addUser);
router.patch('/users/info/:email', userController.updateUserInfo);
router.post('/users/password/check', userController.checkCurrentPassword);
router.patch('/users/password/:email', userController.updateUserPassword);
router.delete('/users/:email', userController.deleteUser);

// 게시물 관련 라우트
router.get('/posts', postController.getAllPosts);
router.get('/posts/:postId', postController.getPostById);
router.post('/posts', postController.addPost);
router.patch('/posts/:postId', postController.updatePost);
router.delete('/posts/:postId', postController.deletePost);

// 댓글 관련 라우트
router.get('/posts/:postId/comments', commentController.getCommentsByPostId);
router.get('/comments/:commentId', commentController.getCommentById);
router.post('/posts/:postId/comments', commentController.createComment);
router.patch('/posts/:postId/comments/:commentId', commentController.updateComment);
router.delete('/posts/:postId/comments/:commentId', commentController.deleteComment);

export default router;
