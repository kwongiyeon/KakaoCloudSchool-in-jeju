import express from 'express';
import { userController, postController, commentController } from './controllers.js';
import authenticate from './authenticate.js'; // 인증 미들웨어 가져오기

const router = express.Router();

// 로그인 관련 라우트
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// 사용자 관련 라우트
router.get('/users', userController.getAllUsers);
router.get('/users/:email', userController.getUserByEmail);
router.post('/users', userController.addUser);
router.patch('/users/:email', authenticate, userController.updateUser); // 인증 미들웨어 적용
router.patch('/users/password', authenticate, userController.updateUserPassword); // 인증 미들웨어 적용
router.delete('/users/:email', authenticate, userController.deleteUser); // 인증 미들웨어 적용

// 게시물 관련 라우트
router.get('/posts', postController.getAllPosts);
router.get('/posts/:postId', postController.getPostById);
router.post('/posts', authenticate, postController.addPost); // 인증 미들웨어 적용
router.patch('/posts/:postId', authenticate, postController.updatePost); // 인증 미들웨어 적용
router.delete('/posts/:postId', authenticate, postController.deletePost); // 인증 미들웨어 적용

// 댓글 관련 라우트
router.get('/posts/:postId/comments', commentController.getCommentsByPostId);
router.post('/posts/:postId/comments', authenticate, commentController.createComment); // 인증 미들웨어 적용
router.patch('/posts/:postId/comments/:commentId', authenticate, commentController.updateComment); // 인증 미들웨어 적용
router.delete('/posts/:postId/comments/:commentId', authenticate, commentController.deleteComment); // 인증 미들웨어 적용

export default router;