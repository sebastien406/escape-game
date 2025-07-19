const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/userRepository");

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;


exports.register = async (req, res) => {
  // TODO : Récupérer le nom d'utilisateur username et le mot de passe password depuis le corps de la requête
const { username, password } = req.body;
  if (!username || !password) {
    console.log(" ⚠️ Registration failed: Missing username or password");
    return res.status(400).json({ error: "Username and password are required" });
  }

  const existing = userRepo.findUserByUsername(username);
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }
 try { 
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = userRepo.createUser({ username, password: hash, currentRoom: 1 });
   return res.status(201).json({message: "User registered successfully",user: { id: user.id, username: user.username, currentRoom: user.currentRoom }
    });
  } catch (error) { 
    return res.status(500).json({ error: "Internal server error during registration" });
  }
  // TODO : Hash the password before storing it
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = userRepo.createUser({ username, password: hash, currentRoom: 1 });

  // TODO : Return a success message 

};

exports.login = async (req, res) => {
  // TODO : Récupérer le nom d'utilisateur username et le mot de passe password depuis le corps de la requête
   const { username, password } = req.body;

  console.log("Login attempt for:", username);

  const user = userRepo.findUserByUsername(username);
  // TODO : Vérifier si l'utilisateur existe sinon retourner un statut 401

  // Compare the provided password with the stored hash
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  console.log(" ✅ User authenticated:", username);
  // TODO : Sign the JWT token with the username and JWT_SECRET
  const token = jwt.sign({ id: user.id, username: user.username, currentRoom: user.currentRoom }, JWT_SECRET, { expiresIn: '1h' });
  // TODO : Return the token in the response in json
  res.json({ token });
};

exports.me = (req, res) => {
  res.json({ user: req.user });
};

