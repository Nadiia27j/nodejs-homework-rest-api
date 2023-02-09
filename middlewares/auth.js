const {Unauthorized} = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const {authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized")
    }
  
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    req.user = user;
   
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
  } catch (error) {
    if (error.name === "Invalid sugnature") {
      throw Unauthorized("jwt token is not valid");
    }
    throw error;
  }
  next();
};

module.exports = auth;
