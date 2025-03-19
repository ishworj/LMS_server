import nodemailer from "nodemailer";

export const SendMail = async (token) => {
  try {
    const config = {
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "lincoln.schumm@ethereal.email",
        pass: "eekBsc5zbqTtQBTDfk",
      },
    };

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: "lincoln.schumm@ethereal.email",
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Verify you readease account", // Subject line
      text: "please veify your readease account using following link", // plain text body
      html: `<p> <a href="http://localhost:8080/api/v1/auth/verify/${token}">vefify here </a></p>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};
