module.exports = {
  consoleReset: function () {
    return process.stdout.write('\033c');
  }
};
