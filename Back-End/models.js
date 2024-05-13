import { users, posts, comments } from './DB.json';
import routes from '../routes.js';

// 사용자 목록 조회
exports.getAllUsers = () => {
    return users;
};

// 사용자 이메일로 조회
exports.getUserByEmail = (email) => {
    return users.find(user => user.email === email);
};

// 사용자 ID로 조회
exports.getUserById = (userId) => {
    return users.find(user => user.user_id === userId);
};


// 새로운 사용자 생성
exports.createUser = (userData) => {
    // userData에는 새로운 사용자의 정보가 포함되어 있어야 합니다.
    // 여기서는 간단하게 사용자 목록에 추가하는 것으로 가정합니다.
    users.push(userData);
};

// 사용자 정보 업데이트
exports.updateUser = (userId, updatedUserData) => {
    // userId에 해당하는 사용자를 찾아서 업데이트합니다.
    // 여기서는 사용자 목록에서 해당 사용자를 찾아 업데이트하는 것으로 가정합니다.
    const index = users.findIndex(user => user.user_id === userId);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUserData };
    }
};

// 사용자 삭제
exports.deleteUser = (userId) => {
    // userId에 해당하는 사용자를 삭제합니다.
    // 여기서는 사용자 목록에서 해당 사용자를 찾아 삭제하는 것으로 가정합니다.
    const index = users.findIndex(user => user.user_id === userId);
    if (index !== -1) {
        users.splice(index, 1);
    }
};

// 모든 게시물 가져오기
exports.getAllPosts = () => {
    return posts;
};

// 게시물 ID로 가져오기
exports.getPostById = (postId) => {
    return posts.find(post => post.post_id === postId);
};

// 새로운 게시물 생성
exports.createPost = (postData) => {
    // postData에는 새로운 게시물의 정보가 포함되어 있어야 합니다.
    // 여기서는 간단하게 게시물 목록에 추가하는 것으로 가정합니다.
    posts.push(postData);
};

// 게시물 정보 업데이트
exports.updatePost = (postId, updatedPostData) => {
    // postId에 해당하는 게시물을 찾아서 업데이트합니다.
    // 여기서는 게시물 목록에서 해당 게시물을 찾아 업데이트하는 것으로 가정합니다.
    const index = posts.findIndex(post => post.post_id === postId);
    if (index !== -1) {
        posts[index] = { ...posts[index], ...updatedPostData };
    }
};

// 게시물 삭제
exports.deletePost = (postId) => {
    // postId에 해당하는 게시물을 삭제합니다.
    // 여기서는 게시물 목록에서 해당 게시물을 찾아 삭제하는 것으로 가정합니다.
    const index = posts.findIndex(post => post.post_id === postId);
    if (index !== -1) {
        posts.splice(index, 1);
    }
};

// 모든 댓글 가져오기
exports.getAllComments = () => {
    return comments;
};

// 게시물 ID로 댓글 가져오기
exports.getCommentsByPostId = (postId) => {
    return comments.filter(comment => comment.post_id === postId);
};

// 새로운 댓글 생성
exports.createComment = (commentData) => {
    // commentData에는 새로운 댓글의 정보가 포함되어 있어야 합니다.
    // 여기서는 간단하게 댓글 목록에 추가하는 것으로 가정합니다.
    comments.push(commentData);
};

// 댓글 정보 업데이트
exports.updateComment = (commentId, updatedCommentData) => {
    // commentId에 해당하는 댓글을 찾아서 업데이트합니다.
    // 여기서는 댓글 목록에서 해당 댓글을 찾아 업데이트하는 것으로 가정합니다.
    const index = comments.findIndex(comment => comment.comment_id === commentId);
    if (index !== -1) {
        comments[index] = { ...comments[index], ...updatedCommentData };
    }
};

// 댓글 삭제
exports.deleteComment = (commentId) => {
    // commentId에 해당하는 댓글을 삭제합니다.
    // 여기서는 댓글 목록에서 해당 댓글을 찾아 삭제하는 것으로 가정합니다.
    const index = comments.findIndex(comment => comment.comment_id === commentId);
    if (index !== -1) {
        comments.splice(index, 1);
    }
};

export default { userModel, postModel, commentModel };