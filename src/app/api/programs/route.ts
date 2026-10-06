import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  addProgram,
  updateProgram,
  deleteProgram,
} from "@/lib/store";

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { subjectId, title, language, code } = await req.json();
    if (!subjectId || !title || !language || !code) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }
    const program = await addProgram(subjectId, title, language, code);
    if (!program) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }
    return NextResponse.json({ program });
  } catch (error) {
    console.error("Failed to create program:", error);
    return NextResponse.json(
      { error: "Unable to save program. Check the database connection." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { subjectId, programId, title, language, code } = await req.json();
    if (!subjectId || !programId || !title || !language || !code) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }
    const program = await updateProgram(
      subjectId,
      programId,
      title,
      language,
      code
    );
    if (!program) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ program });
  } catch (error) {
    console.error("Failed to update program:", error);
    return NextResponse.json(
      { error: "Unable to update program. Check the database connection." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subjectId = req.nextUrl.searchParams.get("subjectId");
  const programId = req.nextUrl.searchParams.get("programId");

  if (!subjectId || !programId) {
    return NextResponse.json({ error: "IDs required" }, { status: 400 });
  }

  try {
    const ok = await deleteProgram(subjectId, programId);
    if (!ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete program:", error);
    return NextResponse.json(
      { error: "Unable to delete program. Check the database connection." },
      { status: 500 }
    );
  }
}
