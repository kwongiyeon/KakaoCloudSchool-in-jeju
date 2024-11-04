import { readData, writeData } from './models.js';

export const getAllComments = (req, res) => {
    const data = readData();
    res.json(data.comments);
};

export const getCommentsByPostId = (req, res) => {
    const data = readData();
    const comments = data.comments.filter(comment => comment.postId === parseInt(req.params.postId));
    res.json(comments);
};

export const createComment = (req, res) => {
    const data = readData();
    const newComment = {
        commentId: data.comments.length ? data.comments[data.comments.length - 1].commentId + 1 : 1,
        postId: parseInt(req.params.postId),
        ...req.body
    };
    data.comments.push(newComment);
    writeData(data);
    res.status(201).json(newComment);
};

export const updateComment = (req, res) => {
    const data = readData();
    const commentIndex = data.comments.findIndex(comment => comment.commentId === parseInt(req.params.commentId));
    if (commentIndex === -1) {
        res.status(404).json({ message: 'Comment not found' });
        return;
    }
    data.comments[commentIndex] = { ...data.comments[commentIndex], ...req.body };
    writeData(data);
    res.json({ message: 'Comment updated', comment: data.comments[commentIndex] });
};

export const deleteComment = (req, res) => {
    const data = readData();
    const commentIndex = data.comments.findIndex(comment => comment.commentId === parseInt(req.params.commentId));
    if (commentIndex === -1) {
        res.status(404).json({ message: 'Comment not found' });
        return;
    }
    data.comments.splice(commentIndex, 1);
    writeData(data);
    res.json({ message: 'Comment deleted' });
};
