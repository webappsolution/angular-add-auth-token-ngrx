module.exports = {
  consoleReset: function () {
    return process.stdout.write('\033c');
  },
  createResponseError: function(res, status, message) {
    return res.status(status).json({status, message});
  }
};
