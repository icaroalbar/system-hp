require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SES_HOST,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SES_ACCESS_KEY_ID, // generated ethereal user
    pass: process.env.SES_SECRET_ACCESS_KEY, // generated ethereal password
  },
});

module.exports = transporter;
