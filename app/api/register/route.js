import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username și parolă necesare" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { username } });

  if (existingUser) {
    return NextResponse.json(
      { error: "Username deja folosit" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    success: true,
    user: { id: user.id, username: user.username },
  });
}
