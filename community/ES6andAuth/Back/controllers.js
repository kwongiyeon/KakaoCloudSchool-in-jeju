import { getAllUsers, getUserByEmail, createUser, updateUser, deleteUser, getAllPosts, getPostById, createPost, updatePost, deletePost, getAllComments, getCommentsByPostId, createComment, updateComment, deleteComment } from './models.js';

export const userController = {
  getAllUsers: (req, res) => {
    res.json(getAllUsers());
  },
  getUserByEmail: (req, res) => {
    const user = getUserByEmail(req.params.email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  },
  addUser: (req, res) => {
    createUser(req.body);
    res.status(201).json(req.body);
  },
  updateUser: (req, res) => {
    updateUser(req.params.email, req.body);
    res.json({ message: 'User updated' });
  },
  deleteUser: (req, res) => {
    deleteUser(req.params.email);
    res.json({ message: 'User deleted' });
  }
};

export const postController = {
  getAllPosts: (req, res) => {
    res.json(getAllPosts());
  },
  getPostById: (req, res) => {
    const post = getPostById(parseInt(req.params.postId));
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  },
  addPost: (req, res) => {
    createPost(req.body);
    res.status(201).json(req.body);
  },
  updatePost: (req, res) => {
    updatePost(req.params.postId, req.body);
    res.json({ message: 'Post updated' });
  },
  deletePost: (req, res) => {
    deletePost(req.params.postId);
    res.json({ message: 'Post deleted' });
  }
};

export const commentController = {
  getAllComments: (req, res) => {
    res.json(getAllComments());
  },
  getCommentsByPostId: (req, res) => {
    res.json(getCommentsByPostId(parseInt(req.params.postId)));
  },
  addComment: (req, res) => {
    createComment({ postId: parseInt(req.params.postId), ...req.body });
    res.status(201).json(req.body);
  },
  updateComment: (req, res) => {
    updateComment(req.params.commentId, req.body);
    res.json({ message: 'Comment updated' });
  },
  deleteComment: (req, res) => {
    deleteComment(req.params.commentId);
    res.json({ message: 'Comment deleted' });
  }
};
