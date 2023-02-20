// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async data => {
//   const email = { ...data, from: "nadiya77723@gmail.com" };
  
//   await sgMail.send(email);
//   return true;
// };

// const email = {
//   to: "tenin85846@ngopy.com",
//   from: "nadiya77723@gmail.com",
//   subject: "Нова заявка з сайту",
//   html: "<p>З сайту прийшла нова заявка<p/>"
// };

// sgMail.send(email)
// .then(() => console.log("Email send success"))
// .catch(error => console.log(error.message))

// module.exports = sendEmail;





const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "nadiya77723@meta.ua",
      pass: META_PASSWORD
    }
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const email = {
    to: "tenin85846@ngopy.com",
    from: "nadiya77723@meta.ua",
    subject: "Нова заявка з сайту",
    html: "<p>З сайту прийшла нова заявка<p/>"
  };

  transporter.sendMail(email)
  .then(() => console.log("Email send success"))
.catch(error => console.log(error.message))
