// repositories/userRepository.js

const users = []; // Base en mémoire
let nextUserId = 1;

function findUserByUsername(username) {
  return users.find(user => user.username === username);
}

function findUserById(id) {
  return users.find(user => user.id === id);
}

function createUser(userData) { 
    const newUser = {
        id: nextUserId++, 
        username: userData.username,
        password: userData.password,
        currentRoom: userData.currentRoom !== undefined ? userData.currentRoom : 1 };
    users.push(newUser);
    return newUser; 
}

function updateUserRoom(userId, newRoomId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.currentRoom = newRoomId;
        return true;
    }
    return false;
}

function getAllUsers() {
  return users;
}

module.exports = {
  users,
  findUserByUsername,
  findUserById,
  createUser,
  updateUserRoom,
  getAllUsers,
};
