import User from "@/models/Users";
import { dbConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Invalid emailId" }, { status: 400 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User LoggedIN Successfully",
      sucess: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong on the server side" },
      { status: 500 }
    );
  }
}
