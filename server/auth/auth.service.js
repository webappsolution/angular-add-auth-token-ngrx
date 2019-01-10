const fs = require("fs");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

// Create a reference to our mocked out users database.
const usersDatabase = JSON.parse(fs.readFileSync("./server/users.json", "UTF-8"));

// Check if the user exists in database (matching username and password) which we'll say is good enough to be authenticated.
function isAuthenticated({username, password}) {
  return usersDatabase.users.findIndex(user => user.username === username && user.password === password) !== -1;
}

// Create a token from a payload.
function createToken(payload) {
  const jwtConfig = {
    expiresIn: config.jwt.expiresIn
  };
  return jwt.sign(payload, config.jwt.secretKey, jwtConfig)
}

function authenticate(username, password) {
  console.log(`authenticate( ${username} / ${password} )`);

  if (isAuthenticated({username, password})) {
    console.log(`authenticate( Success )`);
    return createToken({username, password})
  } else {
    console.warn(`authenticate( Fault )`);
    return null;
  }
}

module.exports = {
  authenticate,
};
