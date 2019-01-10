module.exports = {
  intercept: (req, res, next) => {

    const delay = 500;
    console.log(`intercept( Delaying the request by ${delay} to simulate a real network. )`);
    setTimeout(function () {
      console.log(`intercept( Continue with request. )`);
      next();
    }, delay);
  }
};