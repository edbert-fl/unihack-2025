import { NextResponse } from "next/server";
import { createUser, getAllUsers } from "@/lib/user";
import { User } from "@/lib/user";

export async function POST(request: Request) {
  try {
    const userData = (await request.json()) as User;

    // Basic validation
    if (!userData.username || !userData.email || !userData.passwordHash) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userId = await createUser(userData);

    return NextResponse.json({ success: true, userId }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await getAllUsers();

    // Strip sensitive data like passwordHash
    const safeUsers = users.map(({ passwordHash, ...user }) => user);

    return NextResponse.json(safeUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
