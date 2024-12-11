import { dbConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/Users";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/sendEmail";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "The user is already exist with the email id" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });

    const saved = newUser.save();
    // console.log(newUser._id.toString());

    await sendMail({ email, emailType: "VERIFY", userId: newUser._id });

    return NextResponse.json({
      message: "Data added successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong while adding the data",
      },
      { status: 500 }
    );
  }
}
