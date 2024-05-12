import { users, posts, comments } from '../Front/DB.json';
import userModel from '../models/user';
import postModel from '../models/post';
import commentModel from '../models/comment';
import routes from '../routes.js';
import models from './models';

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


const postController = {
  // 모든 게시물 가져오기
  getAllPosts: (req, res) => {
    const allPosts = postModel.getAllPosts();
    res.json(allPosts);
  },

  // 게시물 ID로 가져오기
  getPostById: (req, res) => {
    const { postId } = req.params;
    const post = postModel.getPostById(parseInt(postId));
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    }
  },

  // 게시글 추가하기
  addPost: (req, res) => {
    const newPost = req.body;
    const addedPost = postModel.addPost(newPost);
    res.status(201).json(addedPost);
  },

  // 게시글 업데이트하기
  updatePost: (req, res) => {
    const { postId } = req.params;
    const updatedPost = req.body;
    const result = postModel.updatePost(postId, updatedPost);
    if (result) {
      res.json({ message: '게시글이 업데이트되었습니다.' });
    } else {
      res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
  },

  // 게시글 삭제하기
  deletePost: (req, res) => {
    const { postId } = req.params;
    const result = postModel.deletePost(postId);
    if (result) {
      res.json({ message: '게시글이 삭제되었습니다.' });
    } else {
      res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
  }
};


const commentController = {
  // 모든 댓글 가져오기
  getAllComments: (req, res) => {
    const allComments = commentModel.getAllComments();
    res.json(allComments);
  },

  // 게시물 ID로 댓글 가져오기
  getCommentsByPostId: (req, res) => {
    const { postId } = req.params;
    const comments = commentModel.getCommentsByPostId(parseInt(postId));
    res.json(comments);
  },

  // 댓글 추가하기
  addComment: (req, res) => {
    const { postId } = req.params;
    const newComment = req.body;
    const addedComment = commentModel.addComment(parseInt(postId), newComment);
    res.status(201).json(addedComment);
  },

  // 댓글 업데이트하기
  updateComment: (req, res) => {
    const { commentId } = req.params;
    const updatedComment = req.body;
    const result = commentModel.updateComment(parseInt(commentId), updatedComment);
    if (result) {
      res.json({ message: '댓글이 업데이트되었습니다.' });
    } else {
      res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }
  },

  // 댓글 삭제하기
  deleteComment: (req, res) => {
    const { commentId } = req.params;
    const result = commentModel.deleteComment(parseInt(commentId));
    if (result) {
      res.json({ message: '댓글이 삭제되었습니다.' });
    } else {
      res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }
  }
};

export default { userController, postController, commentController, routes };
