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
    const program = addProgram(subjectId, title, language, code);
    if (!program) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }
    return NextResponse.json({ program });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
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
    const program = updateProgram(subjectId, programId, title, language, code);
    if (!program) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ program });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
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

  const ok = deleteProgram(subjectId, programId);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
