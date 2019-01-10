const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const util = require("./util.js");

const server = jsonServer.create();
const router = jsonServer.router("./server/db.json");
const usersDatabase = JSON.parse(fs.readFileSync("./server/users.json", "UTF-8"));

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";
const expiresIn = "1h";
const PORT = 4301;

// Create a token from a payload
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err);
}

// Return the token valid from the request header
function getTokenFromHeader(req) {
  return req.headers.authorization.split(" ")[1];
}

// Check if the user exists in database
function isAuthenticated({username, password}) {
  return usersDatabase.users.findIndex(user => user.username === username && user.password === password) !== -1;
}

function invalidLoginRequest(res) {
  const message = `Invalid login request. Must contain a valid username and password. ${httpStatus["400_MESSAGE"]}`;
  console.log(`invalidLoginRequest( ${message} )`);
  return createResponseError(res, httpStatus.BAD_REQUEST, message);
}

function incorrectLoginCredentials(res) {
  const message = `Incorrect username or password. ${httpStatus["401_MESSAGE"]}`;
  console.log(`incorrectLoginCredentials( ${message} )`);
  return createResponseError(res, httpStatus.UNAUTHORIZED, message);
}

function invalidAuthHeader(res) {
  const message = `Error in authorization format. Invalid authentication header. ${httpStatus["401_MESSAGE"]}`;
  console.log(`invalidAuthHeader( ${message} )`);
  return createResponseError(res, httpStatus.UNAUTHORIZED, message);
}

function invalidToken(res) {
  const message = `Invalid token. ${httpStatus["401_MESSAGE"]}`;
  console.log(`invalidToken( ${message} )`);
  return createResponseError(res, httpStatus.UNAUTHORIZED, message);
}

function isAuthHeaderInvalid(req) {
  const authHeader = req.headers.authorization;
  return !authHeader || authHeader.split(" ")[0] !== "Bearer";
}

function createResponseError(res, status, message) {
  return res.status(status).json({status, message});
}

server.post("/api/auth/login", (req, res) => {
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
  res.status(httpStatus.OK).json({accessToken: accessToken});
});

server.use(/^(?!\/api\/auth).*$/,  (req, res, next) => {
  if (isAuthHeaderInvalid(req)) {
    invalidAuthHeader(res);
    return;
  }
  try {
    verifyToken(getTokenFromHeader(res));
    next();
  } catch (err) {
    invalidToken(res);
  }
});

server.use("/api", router);

server.listen(PORT, () => {
  util.consoleReset();
  console.log(`----------------------------------------------------------------------`);
  console.log(`Running Auth API Server on: http://localhost:${PORT}`);
  console.log(`----------------------------------------------------------------------`);
  console.log("\n");
});