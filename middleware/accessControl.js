// module.exports = (req, res, next) => {
//   const roomId = parseInt(req.params.id);
//   const currentRoom = req.user.currentRoom;

//   if (roomId > currentRoom) {
//     return res.status(403).json({ error: "You haven't reached this room yet." });
//   }

//   next();
// };

// const accessControl = (req, res, next) => {
//     if (!req.user || req.user.currentRoom === undefined) {
//         return res.status(401).json({ error: "Authentication details missing or incomplete. Please login." });
//     }
// const roomId = parseInt(req.params.id, 10); 
//     if (isNaN(roomId)) 
//         return res.status(400).json({ error: "Invalid room ID" });
//     if (roomId > req.user.currentRoom) {
//   return res.status(403).json({ error: "Access denied. You haven't reached this room yet." });
//     }
// next(); 
// };

// module.exports = accessControl;

// middleware/accessControl.js

const accessControl = (req, res, next) => {
    // --- LOGS DE DÉBOGAGE CRUCIAUX ---
    console.log(" ➡️ Inside accessControl middleware.");
    // Ceci nous dira si req.user est bien là et s'il a un username
    console.log("    req.user (from auth middleware):", req.user ? req.user.username : "UNDEFINED");
    console.log("    req.params.id:", req.params.id);
    // --- FIN DES LOGS DE DÉBOGAGE ---

    // VÉRIFICATION ESSENTIELLE : S'assurer que req.user est défini et contient les infos nécessaires
    if (!req.user || req.user.id === undefined || req.user.username === undefined || req.user.currentRoom === undefined) {
        console.log(" ❌ Access control failed: req.user is incomplete or undefined. Likely auth middleware issue.");
        return res.status(401).json({ error: "Authentication details missing or incomplete. Please login." });
    }

    const roomId = parseInt(req.params.id, 10); // Spécifiez la base 10 pour parseInt

    // VÉRIFICATION DE LA VALIDITÉ DE ROOMID
    if (isNaN(roomId)) {
        console.log(` ❌ Access control failed: Invalid room ID provided: ${req.params.id}`);
        return res.status(400).json({ error: "Invalid room ID" });
    }

    // Log des valeurs pour la comparaison
    console.log(`    User's currentRoom: ${req.user.currentRoom}, Requested roomId: ${roomId}`);

    // LOGIQUE PRINCIPALE DU CONTRÔLE D'ACCÈS : L'utilisateur peut-il accéder à cette salle ?
    if (roomId > req.user.currentRoom) {
        console.log(` ⚠️ Access control denied for ${req.user.username}: Tried to access room ${roomId} but current room is ${req.user.currentRoom}`);
        return res.status(403).json({ error: "Access denied. You haven't reached this room yet." });
    }

    console.log(` ✅ Access granted for ${req.user.username} to room ${roomId}`);
    next(); // Passe au contrôleur de la salle
};

module.exports = accessControl;