import { getAllUsers, getUserByEmail, createUser, updateUser, deleteUser, getAllPosts, getPostById, createPost, updatePost, deletePost, getCommentsByPostId, createComment, updateComment, deleteComment } from './models.js';

export const userController = {
  login: (req, res) => {
    const { email, password } = req.body;
    const user = getUserByEmail(email);
    if (user && user.password === password) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid email or password' });
    }
  },
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
    try {
      const { email, password, nickName, chooseFile } = req.body;
      const db = readData();
      const newUserId = db.users.length ? db.users[db.users.length - 1].userId + 1 : 1;
      const newUser = {
        userId: newUserId,
        email,
        password,
        nickName,
        chooseFile
      };
      createUser(newUser);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('회원가입 처리 중 오류 발생:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  updateUser: (req, res) => {
    try {
      const { email, nickName, chooseFile } = req.body;
      const updatedUserData = { nickName, chooseFile };
      updateUser(email, updatedUserData);
      res.json({ message: 'User updated' });
    } catch (error) {
      console.error('회원 정보 수정 중 오류 발생:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
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
  getCommentsByPostId: (req, res) => {
      try {
          const comments = getCommentsByPostId(parseInt(req.params.postId));
          res.json(comments);
      } catch (error) {
          res.status(500).json({ error: 'Failed to get comments' });
      }
  },
  createComment: (req, res) => {
      try {
          const commentData = { postId: parseInt(req.params.postId), ...req.body };
          createComment(commentData);
          res.status(201).json(commentData);
      } catch (error) {
          res.status(500).json({ error: 'Failed to create comment' });
      }
  },
  updateComment: (req, res) => {
      try {
          updateComment(req.params.commentId, req.body);
          res.json({ message: 'Comment updated' });
      } catch (error) {
          res.status(500).json({ error: 'Failed to update comment' });
      }
  },
  deleteComment: (req, res) => {
      try {
          deleteComment(req.params.commentId);
          res.json({ message: 'Comment deleted' });
      } catch (error) {
          res.status(500).json({ error: 'Failed to delete comment' });
      }
  }
};