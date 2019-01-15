const fs = require("fs");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

// Create a reference to our mocked out users database.
const usersDatabase = JSON.parse(fs.readFileSync("./server/database/mock/users.json", "UTF-8")).users;

// Check if the user exists in database (matching username and password) which we'll say is good enough to be authenticated.
function doesUsernameAndPasswordExist({username, password}) {
  return usersDatabase.findIndex(user => user.username === username && user.password === password) !== -1;
}

// Check if the user exists in database (matching username).
function doesUsernameExist({username}) {
  return usersDatabase.findIndex(user => user.username === username) !== -1;
}

// Create a token from a payload.
function createToken(payload) {
  const jwtConfig = {
    expiresIn: config.jwt.expiresIn
  };
  return jwt.sign(payload, config.jwt.secretKey, jwtConfig)
}

function authenticate(username, password) {
  console.info(`authenticate( ${username} / ${password} )`);

  if (doesUsernameAndPasswordExist({username, password})) {
    console.info(`authenticateSuccess( ${username} )`);
    return createToken({username, password})
  } else {
    console.warn(`authenticateFault()`);
    return null;
  }
}

function register(username, password, firstName, lastName) {
  console.log(`register( register "${firstName} ${lastName}" with username and pw: ${username} / ${password} )`);

  if (!doesUsernameExist({username})) {
    console.info(`registerSuccess( ${username} )`);
    const newUser = {
      id: usersDatabase.length + 1,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName
    };
    usersDatabase.push(newUser);
    return createToken({username, password})
  } else {
    console.warn(`registerFault( User "${username}" already exists. )`);
    return null;
  }
}

module.exports = {
  authenticate,
  register
};
