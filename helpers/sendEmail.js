require("dotenv").config();
const sgMail = require("@sendgrid/mail");


const { SENDGRID_API_KEY } = process.env;


sgMail.setApiKey(SENDGRID_API_KEY);



const sendEmail = async data => {
  console.log(data);
  const email = {data, from: "nadiya77723@gmail.com" };

  // eslint-disable-next-line no-useless-catch
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;




// const email = {
//   to: "galec93612@youke1.com",
//   from: "nadiya77723@gmail.com",
//   subject: "Нове повідомлення з сайту",
//   html: "<p>З сайту прийшла нова заявка<p/>"
// };

// sgMail.send(email)
// .then(() => console.log("Email send success"))
// .catch(error => console.log(error.message))















// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "nadiya77723@meta.ua",
//     pass: META_PASSWORD
//   }
// };

// const transporter = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "galec93612@youke1.com",
//   from: "nadiya77723@meta.ua",
//   subject: "Нова заявка з сайту",
//   html: "<p>З сайту прийшла нова заявка<p/>"
// };

// transporter
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch(error => console.log(error.message));
