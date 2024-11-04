import { readData, writeData } from './models.js';

export const getAllUsers = (req, res) => {
    const data = readData();
    res.json(data.users);
};

export const getUserByEmail = (req, res) => {
    const data = readData();
    const user = data.users.find(user => user.email === req.params.email);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export const createUser = (req, res) => {
    const data = readData();
    const newUser = {
        userId: data.users.length ? data.users[data.users.length - 1].userId + 1 : 1,
        ...req.body
    };
    data.users.push(newUser);
    writeData(data);
    res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
    const data = readData();
    const userIndex = data.users.findIndex(user => user.email === req.params.email);
    if (userIndex === -1) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    data.users[userIndex] = { ...data.users[userIndex], ...req.body };
    writeData(data);
    res.json({ message: 'User updated', user: data.users[userIndex] });
};

export const deleteUser = (req, res) => {
    const data = readData();
    const userIndex = data.users.findIndex(user => user.email === req.params.email);
    if (userIndex === -1) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    data.users.splice(userIndex, 1);
    writeData(data);
    res.json({ message: 'User deleted' });
};
