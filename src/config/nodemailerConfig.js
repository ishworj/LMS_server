import nodemailer from "nodemailer";

export const SendMail = async (token,email) => {
  try {
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    };

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: process.env.user,
      to: email, 
      subject: "Verify you readease account", 
      text: "please veify your readease account using following link", 
      html: `<p> <a href="http://localhost:8080/api/v1/auth/verify/${token}">Click here to verify </a></p>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};
