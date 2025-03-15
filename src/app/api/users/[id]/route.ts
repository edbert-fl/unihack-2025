import { NextResponse } from "next/server";
import { getUserById } from "@/lib/user";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;

    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { passwordHash, ...safeUserData } = user;

    return NextResponse.json(safeUserData);
  } catch (error) {
    console.error(`Error fetching user ${context.params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
