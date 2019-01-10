const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const util = require("../util");
const config = require("../config.json");

function isAuthHeaderInvalid(req) {
  const authHeader = req.headers.authorization;
  return !authHeader || authHeader.split(" ")[0] !== "Bearer";
}

function invalidAuthHeader(res) {
  const message = `Error in authorization format. Invalid authentication header. ${httpStatus["401_MESSAGE"]}`;
  console.log(`invalidAuthHeader( ${message} )`);
  return util.createErrorResponse(res, httpStatus.UNAUTHORIZED, message);
}

function invalidToken(res) {
  const message = `Invalid token. ${httpStatus["401_MESSAGE"]}`;
  console.log(`invalidToken( ${message} )`);
  return util.createErrorResponse(res, httpStatus.UNAUTHORIZED, message);
}

// Verify the token.
function verifyToken(token) {
  jwt.verify(token, config.jwt.secretKey, function(err, decoded) {
    if (err) {
      console.log(`verifyToken( INVALID )`);
      throw new Error(`${err.name}: ${err.message}`);
    } else {
      console.log(`verifyToken( VALID )`);
      return decoded;
    }
  });
}

// Return the token value from the request header.
function getTokenFromHeader(req) {
  return req.headers.authorization.split(" ")[1];
}

function isAuthApiEndpoint(url) {
  return url.indexOf("/auth") !== -1;
}

function isApiEndpoint(url) {
  return url.indexOf("/api") !== -1;
}

function requiresTokenValidation(url) {
  return !isAuthApiEndpoint(url) && isApiEndpoint(url);
}

module.exports = {
  intercept: (req, res, next) => {
    if (requiresTokenValidation(req.url)) {
      console.log(`intercept( Validate token. )`);
      if (isAuthHeaderInvalid(req)) {
        invalidAuthHeader(res);
        return;
      }
      try {
        verifyToken(getTokenFromHeader(req));
        next();
      } catch (err) {
        console.warn(err);
        invalidToken(res);
      }
    } else {
      // console.log(`intercept( Don't validate token; either auth API endpoint or not an API endpoint. )`);
      next();
    }
  }
};