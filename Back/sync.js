import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connection from './mysql.js';
import { readData, writeData } from './jsonDataHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, 'DB.json');

// Function to start monitoring the ChangeLog table
export function startChangeLogMonitor() {
    setInterval(() => {
        connection.query('SELECT * FROM ChangeLog WHERE changeTime > NOW() - INTERVAL 1 MINUTE', (error, results) => {
            if (error) {
                console.error('ChangeLog 조회 실패:', error);
                return;
            }
            if (results.length > 0) {
                synchronizeWithJSON(results);
            }
        });
    }, 60000); // Check every minute
}

// Function to synchronize JSON file with changes from the database
function synchronizeWithJSON(changes) {
    const db = readData();

    changes.forEach(change => {
        const { tableName, action, rowId } = change;

        switch (tableName) {
            case 'users':
                synchronizeUsers(db, action, rowId);
                break;
            case 'posts':
                synchronizePosts(db, action, rowId);
                break;
            case 'comments':
                synchronizeComments(db, action, rowId);
                break;
            default:
                console.error(`Unknown table: ${tableName}`);
        }
    });

    writeData(db);

    // Clear the ChangeLog table
    connection.query('DELETE FROM ChangeLog WHERE id IN (?)', [changes.map(change => change.id)], (error) => {
        if (error) {
            console.error('ChangeLog 삭제 실패:', error);
        }
    });
}

function synchronizeUsers(db, action, rowId) {
    switch (action) {
        case 'INSERT':
            connection.query('SELECT * FROM users WHERE userId = ?', [rowId], (error, results) => {
                if (error) {
                    console.error('유저 조회 실패:', error);
                    return;
                }
                db.users.push(results[0]);
                writeData(db);
            });
            break;
        case 'UPDATE':
            connection.query('SELECT * FROM users WHERE userId = ?', [rowId], (error, results) => {
                if (error) {
                    console.error('유저 조회 실패:', error);
                    return;
                }
                const userIndex = db.users.findIndex(user => user.userId === rowId);
                if (userIndex !== -1) {
                    db.users[userIndex] = results[0];
                    writeData(db);
                }
            });
            break;
        case 'DELETE':
            const userIndex = db.users.findIndex(user => user.userId === rowId);
            if (userIndex !== -1) {
                db.users.splice(userIndex, 1);
                writeData(db);
            }
            break;
    }
}

// Similarly implement synchronizePosts and synchronizeComments functions
function synchronizePosts(db, action, rowId) {
    switch (action) {
        case 'INSERT':
            connection.query('SELECT * FROM posts WHERE postId = ?', [rowId], (error, results) => {
                if (error) {
                    console.error('포스트 조회 실패:', error);
                    return;
                }
                db.posts.push(results[0]);
                writeData(db);
            });
            break;
        case 'UPDATE':
            connection.query('SELECT * FROM posts WHERE postId = ?', [rowId], (error, results) => {
                if (error) {
                    console.error('포스트 조회 실패:', error);
                    return;
                }
                const postIndex = db.posts.findIndex(post => post.postId === rowId);
                if (postIndex !== -1) {
                    db.posts[postIndex] = results[0];
                    writeData(db);
                }
            });
            break;
        case 'DELETE':
            const postIndex = db.posts.findIndex(post => post.postId === rowId);
            if (postIndex !== -1) {
                db.posts.splice(postIndex, 1);
                writeData(db);
            }
            break;
    }
}

function synchronizeComments(db, action, rowId) {
    switch (action) {
        case 'INSERT':
            connection.query('SELECT * FROM comments WHERE commentId = ?', [rowId], (error, results) => {
                if (error) {
                    console.error('댓글 조회 실패:', error);
                    return;
                }
                db.comments.push(results[0]);
                writeData(db);
            });
            break;
        case 'UPDATE':
            connection.query('SELECT * FROM comments WHERE commentId = ?', [rowId], (error, results) => {
                if (error) {
                    console.error('댓글 조회 실패:', error);
                    return;
                }
                const commentIndex = db.comments.findIndex(comment => comment.commentId === rowId);
                if (commentIndex !== -1) {
                    db.comments[commentIndex] = results[0];
                    writeData(db);
                }
            });
            break;
        case 'DELETE':
            const commentIndex = db.comments.findIndex(comment => comment.commentId === rowId);
            if (commentIndex !== -1) {
                db.comments.splice(commentIndex, 1);
                writeData(db);
            }
            break;
    }
}