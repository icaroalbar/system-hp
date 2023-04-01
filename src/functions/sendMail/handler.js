"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mustache = require("mustache");
const transporter = require("../../shared/transporter");

const templatePath = path.join(__dirname, "templates", "emailTemplate.html");
const emailTemplate = fs.readFileSync(templatePath, "utf8");

module.exports.sendEmail = async (event) => {
  const { company, id, name, email, phone, subject, messageEmail } = JSON.parse(
    event.body
  );

  const data = {
    id,
    company,
    name,
    email,
    phone,
    subject,
    messageEmail,
  };
  const output = mustache.render(emailTemplate, data);

  const message = {
    from: process.env.SES_FROM,
    to: process.env.SES_TO,
    subject: `${process.env.SES_SUBJECT} Icaro Albar`,
    html: output,
  };

  await transporter.sendMail(message);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "E-mail enviado com sucesso" }),
  };
};
