import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodeToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodeToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
