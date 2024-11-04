import { readData, writeData } from './models.js';

export const getAllPosts = (req, res) => {
    const data = readData();
    res.json(data.posts);
};

export const getPostById = (req, res) => {
    const data = readData();
    const post = data.posts.find(post => post.postId === parseInt(req.params.postId));
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

export const createPost = (req, res) => {
    const data = readData();
    const newPost = {
        postId: data.posts.length ? data.posts[data.posts.length - 1].postId + 1 : 1,
        ...req.body
    };
    data.posts.push(newPost);
    writeData(data);
    res.status(201).json(newPost);
};

export const updatePost = (req, res) => {
    const data = readData();
    const postIndex = data.posts.findIndex(post => post.postId === parseInt(req.params.postId));
    if (postIndex === -1) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    data.posts[postIndex] = { ...data.posts[postIndex], ...req.body };
    writeData(data);
    res.json({ message: 'Post updated', post: data.posts[postIndex] });
};

export const deletePost = (req, res) => {
    const data = readData();
    const postIndex = data.posts.findIndex(post => post.postId === parseInt(req.params.postId));
    if (postIndex === -1) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    data.posts.splice(postIndex, 1);
    writeData(data);
    res.json({ message: 'Post deleted' });
};
