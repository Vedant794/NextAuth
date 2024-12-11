import { dbConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/Users";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Verification token is not valid" },
        { status: 400 }
      );
    }

    // console.log(token);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Token verified Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ Error: error.message }, { status: 500 });
  }
}
