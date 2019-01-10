const httpStatus = require("http-status");

module.exports = {
  consoleReset: function () {
    return process.stdout.write('\033c');
  },
  createSuccessResponse: function(res, body, status, message) {
    status = status || httpStatus.OK;
    message = message || httpStatus["200_MESSAGE"];
    return res.status(status).json(body);
  },
  createErrorResponse: function(res, status, message) {
    return res.status(status).json({status, message});
  }
};
