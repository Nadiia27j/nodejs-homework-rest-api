const { Conflict } = require("http-errors");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const avatarURL = gravatar.url(email);
  

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const verificationToken = uuidv4();
  console.log(verificationToken);

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken
  });

  const mail = {
    to: email,
    subject: "Please confirm your email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Email verification</a>`
  };


  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        result, 
      }
    }
  });
};

module.exports = register;
