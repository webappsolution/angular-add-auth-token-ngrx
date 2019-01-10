const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const authTokenInterceptor = require("./auth/auth-token.interceptor");
const util = require("./util");
const config = require("./config.json");

const server = jsonServer.create();
const router = jsonServer.router("./server/database/mock/db.json");

// Setup express request body parsing.
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

// Add a security filter to intercept and inspect requests for valid tokens.
server.use(authTokenInterceptor.intercept);

// API routes.
server.use("/api/auth", require("./auth/auth.controller"));
server.use("/api", router);

// Start the server.
server.listen(config.port, () => {
  util.consoleReset();
  console.log(`----------------------------------------------------------------------`);
  console.log(`Running Auth API Server on: http://localhost:${config.port}`);
  console.log(`----------------------------------------------------------------------`);
  console.log("\n");
});