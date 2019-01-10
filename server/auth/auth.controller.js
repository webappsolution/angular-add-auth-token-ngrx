const express = require("express");
const router = express.Router();
const httpStatus = require("http-status");

const authService = require("./auth.service");
const util = require("../util");

// Define the list of auth routes
router.post("/login", authenticate);
router.post("/register", register);

// Export the routes defined here in this controller to the main server setup.
module.exports = router;

// Handles auth requests that contain the required data: username and password.
function invalidLoginRequest(res) {
  const message = `Invalid login request. Must contain a valid username and password. ${httpStatus["400_MESSAGE"]}`;
  console.log(`invalidLoginRequest( ${message} )`);
  return util.createErrorResponse(res, httpStatus.BAD_REQUEST, message);
}

// Handles failed authentication attempts.
function incorrectLoginCredentials(res) {
  const message = `Incorrect username or password. ${httpStatus["401_MESSAGE"]}`;
  console.log(`incorrectLoginCredentials( ${message} )`);
  return util.createErrorResponse(res, httpStatus.UNAUTHORIZED, message);
}

// Handles the requests that attempt to authenticate the user.
function authenticate(req, res, next) {

  // Attempt to grab the username and password from the request.
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

  // Attempt to authenticate the user.
  const token = authService.authenticate(username, password);
  if (!token) {
    incorrectLoginCredentials(res);
    return;
  }

  // We have a valid token so return a success response with a token.
  util.createSuccessResponse(res, {accessToken: token});
}

// Handles the requests that attempt to register a new user.
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
