import { getAllUsers, getUserByEmail, createUser, updateUser, deleteUser, getAllPosts, getPostById, createPost, updatePost, deletePost, getCommentsByPostId, createComment, updateComment, deleteComment, getCommentById } from './models.js';

export const userController = {
  login: (req, res) => {
    const { email, password } = req.body;
    const user = getUserByEmail(email);

    if (user && user.password === password) {
      req.session.user = { email: user.email, nickName: user.nickName };
      res.cookie('user', JSON.stringify({ email: user.email, nickName: user.nickName }), { httpOnly: true, secure: false });
      res.status(200).json({ status: 200, message: `환영합니다, ${email}님!` });
    } else {
      res.status(401).json({ status: 401, message: '이메일 또는 패스워드가 잘못되었습니다.' });
    }
  },
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Session destruction error:', err);  // Debug log
        return res.status(500).json({ success: false, message: '로그아웃 중 문제가 발생했습니다.' });
      } else {
        res.clearCookie('connect.sid', { path: '/' });
        res.clearCookie('user', { path: '/' });
        console.log('Session destroyed successfully');  // Debug log
        return res.status(200).json({ success: true, message: '성공적으로 로그아웃되었습니다.' });
      }
    });
  },
  getAllUsers: (req, res) => {
    res.json(getAllUsers());
  },
  getUserByEmail: (req, res) => {
    const { email } = req.params;
    const user = getUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  },
  addUser: (req, res) => {
    try {
      const { email, password, nickName, chooseFile } = req.body;
      const newUser = { email, password, nickName, chooseFile };
      createUser(newUser);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  updateUser: (req, res) => {
    const { email } = req.params;
    const { nickName } = req.body;
    let chooseFile = req.body.chooseFile;
    if (req.file) {
        chooseFile = req.file.filename;
    }
    const user = getUserByEmail(email);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.nickName = nickName;
    if (chooseFile) {
        user.chooseFile = chooseFile;
    }

    updateUser(email, user);
    res.json({ message: 'User updated' });
  },
  updateUserPassword: (req, res) => {
    const { password } = req.body;
    const email = req.session.user.email;  // 세션에서 이메일 가져오기
    const user = getUserByEmail(email);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.password = password;
    updateUser(email, user);
    res.json({ message: 'Password updated' });
  },
  deleteUser: (req, res) => {
    const { email } = req.params;
    deleteUser(email);
    if (req.session.user && req.session.user.email === email) {
      res.clearCookie('user');
      req.session.destroy(err => {
        if (err) {
          return res.status(500).send('Error deleting user.');
        }
      });
    }
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
      res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
    }
  },
  addPost: (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: '로그인 해주세요.' });
    }
    const user = req.session.user;
    const posts = getAllPosts();
    const maxId = posts.reduce((max, post) => post.postId > max ? post.postId : max, 0);
    const newPost = {
      postId: maxId + 1,
      ...req.body,
      nickName: user.nickName,
      datetime: new Date().toISOString(),
    };
    createPost(newPost);
    res.status(201).json(newPost);
  },
  updatePost: (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: '로그인 해주세요.' });
    }
    const user = req.session.user;
    const post = getPostById(parseInt(req.params.postId));
    if (!post) {
      return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
    }
    if (post.nickName !== user.nickName) {
      return res.status(403).json({ message: 'Forbidden: You can only edit your own posts.' });
    }
    updatePost(parseInt(req.params.postId), req.body);
    res.json({ message: '게시글이 수정되었습니다.' });
  },
  deletePost: (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: '로그인 해주세요.' });
    }
    const user = req.session.user;
    const postId = parseInt(req.params.postId);
    const post = getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
    }
    if (post.nickName !== user.nickName) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own posts.' });
    }
    deletePost(postId);
    res.json({ message: '게시글이 삭제되었습니다.' });
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
      if (!req.session.user) {
        return res.status(401).json({ message: '로그인 해주세요.' });
      }
      try {
        const commentData = { postId: parseInt(req.params.postId), ...req.body, nickName: req.session.user.nickName };
        createComment(commentData);
        res.status(201).json(commentData);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create comment' });
      }
  },
  updateComment: (req, res) => {
      if (!req.session.user) {
        return res.status(401).json({ message: '로그인 해주세요.' });
      }
      try {
        const comment = getCommentById(parseInt(req.params.commentId));
        if (!comment) {
          return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.nickName !== req.session.user.nickName) {
          return res.status(403).json({ message: 'Forbidden: You can only edit your own comments.' });
        }
        updateComment(parseInt(req.params.commentId), req.body);
        res.json({ message: 'Comment updated' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to update comment' });
      }
  },
  deleteComment: (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: '로그인 해주세요.' });
    }
    try {
      const comment = getCommentById(parseInt(req.params.commentId));
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      if (comment.nickName !== req.session.user.nickName) {
        return res.status(403).json({ message: 'Forbidden: You can only delete your own comments.' });
      }
      deleteComment(parseInt(req.params.commentId));
      res.json({ message: 'Comment deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  }
};