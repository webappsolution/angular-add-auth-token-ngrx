// 3rd party modules.
const bodyParser = require("body-parser");
const jsonServer = require("json-server");

// App modules.
const authTokenHttpRequestInterceptor = require("./http-interceptor/auth-token.http-request-interceptor");
const mockDataHttpRequestInterceptor = require("./http-interceptor/mock-data.http-request-interceptor");
const authController = require("./auth/auth.controller");
const util = require("./util");
const config = require("./config.json");

// Create the json-server and provide it our database file so it can create
// API routes to access our in-memory data.
const server = jsonServer.create();
const router = jsonServer.router("./server/database/mock/db.json");

// Setup express request body parsing.
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

// Add a security filter to intercept and inspect requests for valid tokens.
server.use(authTokenHttpRequestInterceptor.intercept);

// Delay all mock data request.
server.use(mockDataHttpRequestInterceptor.intercept);

// API routes.
server.use("/api/auth", authController);
server.use("/api", router);

// Start the server.
server.listen(config.port, () => {
  util.consoleReset();
  console.log(`----------------------------------------------------------------------`);
  console.log(`Running Auth API Server on: http://localhost:${config.port}`);
  console.log(`----------------------------------------------------------------------`);
  console.log("\n");
});