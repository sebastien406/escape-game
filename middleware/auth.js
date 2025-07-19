// const jwt = require("jsonwebtoken");
// const { findUserByUsername } = require("../repositories/userRepository");

// const JWT_SECRET = process.env.JWT_SECRET;

// module.exports = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Missing or invalid token" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     //TODO : Vérifier le token JWT avec la clé secrète JWT_SECRET
//     const payload = jwt.verify(token, JWT_SECRET);
//     const user = findUserByUsername(payload.username);
//     if (!user) throw new Error("User not found");
//      req.user = {
//         id: user.id,
//         username: user.username,
//         currentRoom: user.currentRoom
//     };

//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };


const jwt = require("jsonwebtoken");
const { findUserById } = require("../repositories/userRepository"); // Assurez-vous que findUserById est exporté ici

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    console.log(`➡️ [auth.js] Entering auth middleware for URL: ${req.url}`); // Log d'entrée

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log(" ❌ [auth.js] No token or bad format. URL:", req.url);
        return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    console.log(`    [auth.js] Token received: ${token.substring(0, 10)}...`); // Log du token (partiel)

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(`    [auth.js] Token decoded successfully. Decoded ID: ${decoded.id}, Username: ${decoded.username}`);

        const user = findUserById(decoded.id);
        console.log(`    [auth.js] User lookup by ID ${decoded.id} result: ${user ? user.username : "NOT FOUND"}`);

        if (!user) {
            console.log(" ❌ [auth.js] User not found in repository based on token ID. URL:", req.url, "ID:", decoded.id);
            return res.status(401).json({ error: "User not found or session expired. Please re-login." });
        }

        req.user = {
            id: user.id,
            username: user.username,
            currentRoom: user.currentRoom
        };

        console.log(` ✅ [auth.js] req.user SET for ${req.user.username} for URL: ${req.url}`);
        console.log(" ✅ [auth.js] Calling next() with authenticated user.");
        next();
    } catch (err) {
        console.error(" ❌ [auth.js] Token verification FAILED. URL:", req.url, "Error:", err.message);
        return res.status(401).json({ error: "Invalid token" });
    }
};