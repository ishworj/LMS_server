import nodemailer from 'nodemailer'
let configOptions={
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "brionna.schneider90@ethereal.email",
    pass: "zmCVQaRasRVX2GZ6jD",
  },
};

const transporter = nodemailer.createTransport(configOptions)
