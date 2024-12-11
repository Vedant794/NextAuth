import User from "@/models/Users";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedVal = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedVal,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          resetPasswordToken: hashedVal,
          resetPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const maileType = {
      from: "vedantpersonal676@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verfification mail" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedVal}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedVal}
            </p>`,
    };

    console.log(process.env.EMAIL_USER);

    const mailInfo = await transport.sendMail(maileType);
    return mailInfo;
  } catch (error: any) {
    console.error("Error in sendMail function:", error);
    throw new Error(error?.message || "Failed to send email");
  }
};
