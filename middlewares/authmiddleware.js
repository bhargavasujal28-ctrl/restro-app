const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //GET TOKEN
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "unauthorized user",
        });
      } else {
        req.user = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in auth api",
      error,
    });
  }
};
