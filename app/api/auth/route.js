import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Main } from "@/config/drives";

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

async function generateToken() {
  return await jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

async function verifyToken(token) {
  try {
    await jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function GET(request) {
  const token = request.headers.get("x-auth-token");

  const isTokenValid = await verifyToken(token);
  console.log(isTokenValid);

  if (!isTokenValid)
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ success: true, message: "Authorized" }, { status: 200 });
}

export async function POST(request) {
  const res = await request.json();
  const { password } = res;

  if (!password) return NextResponse.json({ message: "Password is required" }, { status: 400 });

  const isPasswordMatch = await comparePassword(password, Main.password);
  if (!isPasswordMatch) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const token = await generateToken();

  return NextResponse.json({ message: "Login success", token });
}
