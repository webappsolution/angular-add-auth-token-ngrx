const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const util = require("./util.js");

const server = jsonServer.create();
const router = jsonServer.router("./server/db.json");
const usersDatabase = JSON.parse(fs.readFileSync("./server/users.json", "UTF-8"));

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";
const expiresIn = "1h";
const PORT = 3000;

// Create a token from a payload
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err);
}

// Check if the user exists in database
function isAuthenticated({username, password}) {
  return usersDatabase.users.findIndex(user => user.username === username && user.password === password) !== -1;
}

function invalidLoginRequest(res) {
  const status = 400;
  const message = "Invalid login request. Must contain a valid username and password.";
  console.log(`invalidLoginRequest( ${message} )`);
  return createResponseError(res, status, message);
}

function incorrectLoginCredentials(res) {
  const status = 401;
  const message = "Incorrect username or password";
  console.log(`incorrectLoginCredentials( ${message} )`);
  return createResponseError(res, status, message);
}

function createResponseError(res, status, message) {
  return res.status(status).json({status, message});
}

server.post("/auth/login", (req, res) => {
  let username = null;
  let password = null;
  try {
    username = req.body.username;
    password = req.body.password;
    console.log(`login( ${username} / ${password} )`);
  } catch (err) {
    invalidLoginRequest(res);
    return;
  }
  if (isAuthenticated({username, password}) === false) {
    incorrectLoginCredentials(res);
    return;
  }
  const accessToken = createToken({username, password});
  res.status(200).json({accessToken: accessToken})
});

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(" ")[0] !== "Bearer") {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({status, message});
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(" ")[1]);
    next()
  } catch (err) {
    const status = 401;
    const message = "Error access token is revoked";
    res.status(status).json({status, message});
  }
});

server.use(router);

server.listen(PORT, () => {
  util.consoleReset();
  console.log(`----------------------------------------------------------------------`);
  console.log(`Running Auth API Server on: http://localhost:${PORT}`);
  console.log(`----------------------------------------------------------------------`);
  console.log("\n");
});