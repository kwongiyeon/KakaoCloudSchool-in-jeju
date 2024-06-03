import usersData from './DB.json' assert { type: 'json' };

const { users, posts, comments } = usersData;

export const getAllUsers = () => users;
export const getUserByEmail = (email) => users.find(user => user.email === email);
export const createUser = (userData) => users.push(userData);
export const updateUser = (email, updatedUserData) => {
  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex !== -1) users[userIndex] = { ...users[userIndex], ...updatedUserData };
};
export const deleteUser = (email) => {
  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex !== -1) users.splice(userIndex, 1);
};

export const getAllPosts = () => posts;
export const getPostById = (postId) => posts.find(post => post.postId === postId);
export const createPost = (postData) => posts.push(postData);
export const updatePost = (postId, updatedPostData) => {
  const postIndex = posts.findIndex(post => post.postId === postId);
  if (postIndex !== -1) posts[postIndex] = { ...posts[postIndex], ...updatedPostData };
};
export const deletePost = (postId) => {
  const postIndex = posts.findIndex(post => post.postId === postId);
  if (postIndex !== -1) posts.splice(postIndex, 1);
};

export const getAllComments = () => comments;
export const getCommentsByPostId = (postId) => comments.filter(comment => comment.postId === postId);
export const createComment = (commentData) => comments.push(commentData);
export const updateComment = (commentId, updatedCommentData) => {
  const commentIndex = comments.findIndex(comment => comment.commentId === commentId);
  if (commentIndex !== -1) comments[commentIndex] = { ...comments[commentIndex], ...updatedCommentData };
};
export const deleteComment = (commentId) => {
  const commentIndex = comments.findIndex(comment => comment.commentId === commentId);
  if (commentIndex !== -1) comments.splice(commentIndex, 1);
};