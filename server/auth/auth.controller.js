const express = require("express");
const router = express.Router();
const httpStatus = require("http-status");

const authService = require("./auth.service");
const util = require("../util");

// Define the list of auth routes and matching handler methods.
router.post("/login", authenticate);
router.post("/register", register);

// Export the routes defined here in this controller to the main server setup.
module.exports = router;

// Handles auth requests that don't contain the required data: username and password.
function invalidLoginRequest(res) {
  const message = `Invalid login request. Must contain a valid username and password. ${httpStatus["400_MESSAGE"]}`;
  console.log(`invalidLoginRequest( ${message} )`);
  return util.createErrorResponse(res, httpStatus.BAD_REQUEST, message);
}

// Handles registration requests that don't contain the required data.
function invalidRegisterRequest(res) {
  const message = `Invalid register request. Must contain a valid firstName, lastName, username and password. ${httpStatus["400_MESSAGE"]}`;
  console.log(`invalidRegisterRequest( ${message} )`);
  return util.createErrorResponse(res, httpStatus.BAD_REQUEST, message);
}

// Handles failed authentication attempts.
function incorrectLoginCredentials(res) {
  const message = `Incorrect username or password. ${httpStatus["401_MESSAGE"]}`;
  console.log(`incorrectLoginCredentials( ${message} )`);
  return util.createErrorResponse(res, httpStatus.UNAUTHORIZED, message);
}

// Handles failed user registration attempts.
function failedToRegister(res) {
  const message = `Cannot register user. ${httpStatus["400_MESSAGE"]}`;
  console.log(`failedToRegister( ${message} )`);
  return util.createErrorResponse(res, httpStatus.BAD_REQUEST, message);
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
    if(!username || !password) {
      invalidLoginRequest(res);
      return;
    }
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
  let firstName = null;
  let lastName = null;
  try {
    username = req.body.username;
    password = req.body.password;
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    console.log(`register( Registering "${firstName} ${lastName}" with username and pw: ${username} / ${password} )`);
    if(!username || !password || !firstName || !lastName) {
      invalidRegisterRequest(res);
      return;
    }
  } catch (err) {
    invalidRegisterRequest(res);
    return;
  }

  // Attempt to register the user.
  const token = authService.register(username, password, firstName, lastName);
  if (!token) {
    failedToRegister(res);
    return;
  }

  // We have a valid token so return a success response with a token.
  util.createSuccessResponse(res, {accessToken: token});
}
