const {User} = require("../../models");
const {BadRequest} = require("http-errors");
const { sendEmail } = require("../../helpers");
const { v4: uuidv4 } = require('uuid');

const resendVerifyEmail = async(req, res) => {
   const {email} = req.body;

   const user = await User.findOne({email});

   if(!user) {
    throw BadRequest("missing required field email");
  }

  if(user.verify) {
     throw BadRequest("Verification has already been passed");
  }

  const verificationToken = uuidv4();

  const mail = {
    to: email,
    from: "nadiya77723@gmail.com",
    subject: "Please confirm your email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Email verification</a>`
  };

  await sendEmail(mail);

  res.json({
    status: 200,
    message: "Verification email sent"
  })
}



module.exports = resendVerifyEmail;