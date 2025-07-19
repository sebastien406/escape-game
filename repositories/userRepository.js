// repositories/userRepository.js

const users = []; // Base en mémoire
let nextUserId = 1;
function findUserByUsername(username) {
  return users.find(user => user.username === username);
}

function findUserById(id) {
  return users.find(user => user.id === id);
}

function createUser(user) {
  users.push(user);
  return user;
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
