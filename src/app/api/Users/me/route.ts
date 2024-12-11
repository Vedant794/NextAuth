import { dbConnect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json(
        { message: "User with this validation is not exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "User Found", data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
