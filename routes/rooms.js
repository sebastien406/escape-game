// const express = require("express");
// const router = express.Router();
// const roomsController = require("../controllers/roomsController");
// const auth = require("../middleware/auth");
// const accessControl = require("../middleware/accessControl");

// // TODO : Ajouter middleware d'authentification auth et de contrôle d'accès accessControl aux routes
// router.get("/:id", auth, accessControl, roomsController.getRoom);
// // TODO : Ajouter middleware d'authentification auth et de contrôle d'accès accessControl à la route pour soumettre une réponse
// router.post("/:id/answer", auth, accessControl, roomsController.submitAnswer);

// module.exports = router;

const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/roomsController");
const auth = require("../middleware/auth");
const accessControl = require("../middleware/accessControl");

// Route GET /:id
router.get("/:id",
    (req, res, next) => { console.log("➡️ [rooms.js] Entering GET /:id route chain."); next(); }, // <-- AJOUTEZ CE LOG
    auth,
    (req, res, next) => { console.log("➡️ [rooms.js] After auth middleware."); next(); }, // <-- AJOUTEZ CE LOG
    accessControl,
    (req, res, next) => { console.log("➡️ [rooms.js] After accessControl middleware. Will call roomsController."); next(); }, // <-- AJOUTEZ CE LOG
    roomsController.getRoom
);

// Route POST /:id/answer
router.post("/:id/answer",
    (req, res, next) => { console.log("➡️ [rooms.js] Entering POST /:id/answer route chain."); next(); }, // <-- AJOUTEZ CE LOG
    auth,
    (req, res, next) => { console.log("➡️ [rooms.js] After auth middleware (POST)."); next(); }, // <-- AJOUTEZ CE LOG
    accessControl,
    (req, res, next) => { console.log("➡️ [rooms.js] After accessControl middleware (POST). Will call roomsController."); next(); }, // <-- AJOUTEZ CE LOG
    roomsController.submitAnswer
);

module.exports = router;