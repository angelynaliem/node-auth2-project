const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// const secret = require("../config/secrets.js");

module.exports = (req, res, next) => {
  // const authHeader = req.headers.authHeader || "";
  // const token = authHeader.split(" ")[1];

  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1] //1 is index 1 which is the token after split because there is a space between Bearer and the value of the token
      : "";

    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          next({ apiCode: 401, apiMessage: "invalid or missing credentials" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      next({ apiCode: 401, apiMessage: "invalid or missing credentials" });
    }
  } catch (err) {
    next({ apiCode: 500, apiMessage: "error validating credentials", ...err });
  }
};
