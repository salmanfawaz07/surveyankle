import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  getSubjects,
  createSubject,
  deleteSubject,
} from "@/lib/store";

export async function GET() {
  try {
    const subjects = await getSubjects();
    return NextResponse.json({ subjects });
  } catch (error) {
    console.error("Failed to load subjects:", error);
    return NextResponse.json(
      { error: "Unable to load subjects. Check the database configuration." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name } = await req.json();
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name required" }, { status: 400 });
    }
    const subject = await createSubject(name);
    return NextResponse.json({ subject });
  } catch (error) {
    console.error("Failed to create subject:", error);
    return NextResponse.json(
      { error: "Unable to save subject. Check the database connection." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  try {
    const ok = await deleteSubject(id);
    if (!ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete subject:", error);
    return NextResponse.json(
      { error: "Unable to delete subject. Check the database connection." },
      { status: 500 }
    );
  }
}
