import {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUserInfo,
  updateUserPassword,
  deleteUser,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
  getCommentById
} from './models.js';
  
  export const userController = {
    login: (req, res) => {
      const { email, password } = req.body;
      getUserByEmail(email, (error, user) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to login' });
        }
        if (user && user.password === password) {
          req.session.user = { email: user.email, nickName: user.nickName };
          res.cookie('user', JSON.stringify({ email: user.email, nickName: user.nickName }), { httpOnly: true, secure: false });
          res.status(200).json({ status: 200, message: `환영합니다, ${email}님!` });
        } else {
          res.status(401).json({ status: 401, message: '이메일 또는 패스워드가 잘못되었습니다.' });
        }
      });
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
      getAllUsers((error, users) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to get users' });
        }
        res.json(users);
      });
    },
    getUserByEmail: (req, res) => {
      const { email } = req.params;
      getUserByEmail(email, (error, user) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to get user' });
        }
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      });
    },
    addUser: (req, res) => {
      const { email, password, nickName, chooseFile } = req.body;
      const newUser = { email, password, nickName, chooseFile };
      createUser(newUser, (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to create user' });
        }
        res.status(201).json({ message: 'User created', user: newUser });
      });
    },
    updateUserInfo: (req, res) => {
      const { email } = req.params;
      const updatedUserData = {
          nickName: req.body.nickName,
          chooseFile: req.body.chooseFile || null
      };

      updateUserInfo(email, updatedUserData, (error, results) => {
          if (error) {
              console.error('Failed to update user info:', error);
              return res.status(500).json({ error: 'Failed to update user info' });
          }
          res.json({ message: 'User info updated' });
      });
  },
  checkCurrentPassword: (req, res) => {
    const { email } = req.body;
    getUserByEmail(email, (error, user) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to verify password' });
        }
        if (user) {
            res.json({ password: user.password });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
  },
updateUserPassword: (req, res) => {
    const { email } = req.params;
    const { password } = req.body;
    console.log(`Updating password for user: ${email}`); // 디버그 로그
    updateUserPassword(email, password, (error, results) => {
        if (error) {
            console.error('Failed to update user password:', error);
            return res.status(500).json({ error: 'Failed to update user password' });
        }
        console.log('Password updated successfully'); // 디버그 로그
        res.json({ message: 'User password updated' });
    });
  },
    deleteUser: (req, res) => {
      const { email } = req.params;
      deleteUser(email, (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to delete user' });
        }
        res.json({ message: 'User deleted' });
      });
    }
  };
  
  export const postController = {
    getAllPosts: (req, res) => {
      getAllPosts((error, posts) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to get posts' });
        }
        posts.forEach(post => {
          if (post.chooseFile) {
            post.chooseFile = `${post.chooseFile}`;
          }
        });
        res.json(posts);
      });
    },
    getPostById: (req, res) => {
      const postId = parseInt(req.params.postId);
      getPostById(postId, (error, post) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to get post' });
        }
        if (post && post.chooseFile) {
          post.chooseFile = `${post.chooseFile}`;
        }
        res.json(post);
      });
    },
    addPost: (req, res) => {
      const { posttitle, content, nickName, datetime, chooseFile } = req.body;
      const formattedDatetime = new Date(datetime).toISOString().slice(0, 19).replace('T', ' '); // DATETIME 형식으로 변환
      const newPost = {
          posttitle,
          content,
          nickName,
          datetime: formattedDatetime,
          chooseFile,
          likes: 0,
          comments: 0,
          views: 0
      };

      console.log('Received new post:', newPost); // 디버깅 메시지 추가

      createPost(newPost, (error, results) => {
          if (error) {
              console.error('Failed to create post:', error);
              return res.status(500).json({ error: 'Failed to create post' });
          }
          res.status(201).json({ postId: results.insertId, ...newPost });
      });
    },
    updatePost: (req, res) => {
      const postId = parseInt(req.params.postId);
      const { posttitle, content, datetime, chooseFile } = req.body;
      const formattedDatetime = new Date(datetime).toISOString().slice(0, 19).replace('T', ' '); // DATETIME 형식으로 변환
      const updatedPostData = {
        posttitle,
        content,
        datetime: formattedDatetime,
        chooseFile
      };
  
      updatePost(postId, updatedPostData, (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to update post' });
        }
        res.json({ message: 'Post updated' });
      });
    },
    deletePost: (req, res) => {
      const postId = parseInt(req.params.postId);
      deletePost(postId, (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to delete post' });
        }
        res.json({ message: 'Post deleted' });
      });
    }
  };
  
  export const commentController = {
    getCommentsByPostId: (req, res) => {
      const postId = parseInt(req.params.postId);
      getCommentsByPostId(postId, (error, comments) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to get comments' });
        }
        res.json(comments);
      });
    },
    getCommentById: (req, res) => {
      const commentId = parseInt(req.params.commentId);
      getCommentById(commentId, (error, comment) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to get comment' });
        }
        if (comment) {
          res.json(comment);
        } else {
          res.status(404).json({ message: 'Comment not found' });
        }
      });
    },
    createComment: (req, res) => {
      const newComment = req.body;
      const datetime = new Date(newComment.datetime).toISOString().slice(0, 19).replace('T', ' ');
      newComment.datetime = datetime;
  
      console.log('Received new comment:', newComment); // 디버깅 메시지 추가
  
      createComment(newComment, (error, results) => {
        if (error) {
          console.error('Failed to create comment:', error);
          return res.status(500).json({ error: 'Failed to create comment' });
        }
        res.status(201).json(newComment);
      });
    },
    updateComment: (req, res) => {
      const commentId = parseInt(req.params.commentId);
      const updatedCommentData = req.body;
      updateComment(commentId, updatedCommentData, (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to update comment' });
        }
        res.json({ message: '댓글이 수정되었습니다.' });
      });
    },
    deleteComment: (req, res) => {
      const commentId = parseInt(req.params.commentId);
      deleteComment(commentId, (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to delete comment' });
        }
        res.json({ message: 'Comment deleted' });
      });
    }
  };