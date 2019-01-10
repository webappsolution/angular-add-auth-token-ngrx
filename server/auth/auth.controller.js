const fs = require("fs");
const express = require("express");
const router = express.Router();
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

// const authService = require("./auth.service");
const util = require("../util");
const config = require("../config.json");

// Create a reference to our mocked out users database.
const usersDatabase = JSON.parse(fs.readFileSync("./server/users.json", "UTF-8"));

// Define the list of auth routes
router.post("/login", authenticate);
router.post("/register", register);

// Export the routes defined here in this controller to the main server setup.
module.exports = router;

// Create a token from a payload.
function createToken(payload) {
  const jwtConfig = {
    expiresIn: config.jwt.expiresIn
  };
  return jwt.sign(payload, config.jwt.secretKey, jwtConfig)
}

// Check if the user exists in database (matching username and password) which we'll say is good enough to be authenticated.
function isAuthenticated({username, password}) {
  return usersDatabase.users.findIndex(user => user.username === username && user.password === password) !== -1;
}

function invalidLoginRequest(res) {
  const message = `Invalid login request. Must contain a valid username and password. ${httpStatus["400_MESSAGE"]}`;
  console.log(`invalidLoginRequest( ${message} )`);
  return util.createResponseError(res, httpStatus.BAD_REQUEST, message);
}

function incorrectLoginCredentials(res) {
  const message = `Incorrect username or password. ${httpStatus["401_MESSAGE"]}`;
  console.log(`incorrectLoginCredentials( ${message} )`);
  return util.createResponseError(res, httpStatus.UNAUTHORIZED, message);
}

function authenticate(req, res, next) {
  let username = null;
  let password = null;
  try {
    username = req.body.username;
    password = req.body.password;
    console.log(`authenticate( ${username} / ${password} )`);
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
  // userServic/*e.authenticate(req.body)
  //   .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
  //   .catch(e*/rr => next(err));
}

function register(req, res, next) {
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
  // userServic/*e.authenticate(req.body)
  //   .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
  //   .catch(e*/rr => next(err));
}
