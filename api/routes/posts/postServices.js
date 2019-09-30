const tokenService = require("../../utils/tokenService");
exports.authorCheck = async (req, res, next) => {};

exports.loginCheck = async (req, res, next) => {
  const authHeader = req.body.headers["Authorization"];

  if (!authHeader) {
    next(new Error("invalid request"));
  } else {
    try {
      const [prefix, token] = authHeader.split(" ");
      const decoded = await tokenService.verifyToken(token);
      if (decoded) {
        req.token = decoded;
        next();
      } else {
        next(new status(401).send("You are not logged in."));
      }
    } catch (e) {
      console.error(e);
    }
  }
};
