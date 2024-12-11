import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
