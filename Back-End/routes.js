import express from 'express';
import { userController, postController, commentController } from './controllers.js';

const router = express.Router();

// 사용자 관련 라우트
router.get('/users', userController.getAllUsers);
router.get('/users/:email', userController.getUserByEmail);
router.post('/users', userController.addUser);
router.patch('/users/:email', userController.updateUser);
router.delete('/users/:email', userController.deleteUser);

// 게시물 관련 라우트
router.get('/posts', postController.getAllPosts);
router.get('/posts/:postId', postController.getPostById);
router.post('/posts', postController.addPost);
router.patch('/posts/:postId', postController.updatePost);
router.delete('/posts/:postId', postController.deletePost);

// 댓글 관련 라우트
router.get('/comments', commentController.getAllComments);
router.get('/comments/:postId', commentController.getCommentsByPostId);
router.post('/comments/:postId', commentController.addComment);
router.patch('/comments/:commentId', commentController.updateComment);
router.delete('/comments/:commentId', commentController.deleteComment);

export default router;