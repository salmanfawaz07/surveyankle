import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export type Program = {
  id: string;
  title: string;
  language: string;
  code: string;
};

export type Subject = {
  id: string;
  name: string;
  programs: Program[];
};

export type DB = {
  subjects: Subject[];
};

const DATA_PATH = path.join(process.cwd(), "data", "db.json");

function readDB(): DB {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as DB;
  } catch {
    return { subjects: [] };
  }
}

function writeDB(db: DB) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(db, null, 2), "utf-8");
}

export function getSubjects(): Subject[] {
  return readDB().subjects;
}

export function getSubject(id: string): Subject | undefined {
  return readDB().subjects.find((s) => s.id === id);
}

export function getSubjectByName(name: string): Subject | undefined {
  return readDB().subjects.find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );
}

export function createSubject(name: string): Subject {
  const db = readDB();
  const subject: Subject = {
    id: uuidv4(),
    name: name.trim(),
    programs: [],
  };
  db.subjects.push(subject);
  writeDB(db);
  return subject;
}

export function deleteSubject(id: string): boolean {
  const db = readDB();
  const before = db.subjects.length;
  db.subjects = db.subjects.filter((s) => s.id !== id);
  writeDB(db);
  return db.subjects.length < before;
}

export function addProgram(
  subjectId: string,
  title: string,
  language: string,
  code: string
): Program | null {
  const db = readDB();
  const subject = db.subjects.find((s) => s.id === subjectId);
  if (!subject) return null;

  const program: Program = {
    id: uuidv4(),
    title: title.trim(),
    language: language.trim(),
    code: code,
  };
  subject.programs.push(program);
  writeDB(db);
  return program;
}

export function updateProgram(
  subjectId: string,
  programId: string,
  title: string,
  language: string,
  code: string
): Program | null {
  const db = readDB();
  const subject = db.subjects.find((s) => s.id === subjectId);
  if (!subject) return null;

  const program = subject.programs.find((p) => p.id === programId);
  if (!program) return null;

  program.title = title.trim();
  program.language = language.trim();
  program.code = code;
  writeDB(db);
  return program;
}

export function deleteProgram(subjectId: string, programId: string): boolean {
  const db = readDB();
  const subject = db.subjects.find((s) => s.id === subjectId);
  if (!subject) return false;

  const before = subject.programs.length;
  subject.programs = subject.programs.filter((p) => p.id !== programId);
  writeDB(db);
  return subject.programs.length < before;
}

export function getProgram(
  subjectId: string,
  programId: string
): Program | null {
  const subject = getSubject(subjectId);
  if (!subject) return null;
  return subject.programs.find((p) => p.id === programId) || null;
}
