import nodemailer from "nodemailer";

export const verifyUserTemplate = (token, email) => {
  return {
    from: process.env.user,
    to: email,
    subject: "Verify you readease account",
    text: "please veify your readease account using following link",
    html: `<p> <a href="http://localhost:${process.env.PORT}/api/v1/auth/verify/${token}">Click here to verify </a></p>`,
  };
};


export const passwordResetTemplate = (email, name, otp) => {
  return {
    from: process.env.user, 
    to: email,
    subject: "Your OTP to Reset Your Password",
    text: `Hello ${name}, 

Here is your OTP: ${otp} to reset your password. 
The OTP will expire in 5 minutes.

Best regards,
Your Support Team`,
    html: `<p>Hello ${name},</p>
           <p>Here is your OTP: <strong>${otp}</strong> to reset your password.</p>
           <p>The OTP will expire in <strong>5 minutes</strong>.</p>
           <p>Best regards,<br>Your Support Team</p>`,
  };
};

export const profileUpdatedTemplate = (email, name) => {
  return {
    from: process.env.user, 
    to: email,
    subject: "Your account has been updated",
    text: ` Dear ${name}if its not you go ahead and change your password,and contact us`,
    html: `<p>Hello ${name},</p>
           `,
  };
};

export const contactTemplate = ({email,subject,message}) => {
  return {
    from: email,
    to: process.env.user,
    replyTo: email,
    subject: subject,
    text: message,
  };
};



export const SendMail = async (template) => {
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

    return await transporter.sendMail(template);


  } catch (error) {
    console.log(error);
  }
};
