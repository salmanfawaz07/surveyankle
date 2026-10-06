"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Subject } from "@/lib/store";

type Props = {
  subjects: Subject[];
};

export default function AdminDashboard({ subjects: initialSubjects }: Props) {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [programTitle, setProgramTitle] = useState("");
  const [programLanguage, setProgramLanguage] = useState("C");
  const [programCode, setProgramCode] = useState("");
  const [editing, setEditing] = useState<{
    subjectId: string;
    programId: string;
  } | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const showMsg = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;

    const res = await fetch("/api/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newSubjectName }),
    });

    if (res.ok) {
      const data = await res.json();
      setSubjects([...subjects, data.subject]);
      setNewSubjectName("");
      showMsg("Subject created!");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      showMsg(data.error || "Failed to create subject");
    }
  };

  const handleDeleteSubject = async (id: string) => {
    if (!confirm("Delete this subject and all its programs?")) return;

    const res = await fetch(`/api/subjects?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setSubjects(subjects.filter((s) => s.id !== id));
      showMsg("Subject deleted");
      router.refresh();
    }
  };

  const handleAddOrUpdateProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubjectId || !programTitle.trim() || !programCode.trim()) {
      showMsg("Please fill all fields");
      return;
    }

    if (editing) {
      // Update
      const res = await fetch("/api/programs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectId: editing.subjectId,
          programId: editing.programId,
          title: programTitle,
          language: programLanguage,
          code: programCode,
        }),
      });
      if (res.ok) {
        showMsg("Program updated!");
        setEditing(null);
        setProgramTitle("");
        setProgramCode("");
        setSelectedSubjectId("");
        // refresh subjects
        const refreshed = await fetch("/api/subjects").then((r) => r.json());
        setSubjects(refreshed.subjects);
        router.refresh();
      }
    } else {
      // Create
      const res = await fetch("/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectId: selectedSubjectId,
          title: programTitle,
          language: programLanguage,
          code: programCode,
        }),
      });
      if (res.ok) {
        showMsg("Program published!");
        setProgramTitle("");
        setProgramCode("");
        const refreshed = await fetch("/api/subjects").then((r) => r.json());
        setSubjects(refreshed.subjects);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        showMsg(data.error || "Failed to add program");
      }
    }
  };

  const startEdit = (subjectId: string, programId: string) => {
    const subject = subjects.find((s) => s.id === subjectId);
    const program = subject?.programs.find((p) => p.id === programId);
    if (!program) return;

    setEditing({ subjectId, programId });
    setSelectedSubjectId(subjectId);
    setProgramTitle(program.title);
    setProgramLanguage(program.language);
    setProgramCode(program.code);
  };

  const handleDeleteProgram = async (subjectId: string, programId: string) => {
    if (!confirm("Delete this program?")) return;

    const res = await fetch(
      `/api/programs?subjectId=${subjectId}&programId=${programId}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      showMsg("Program deleted");
      const refreshed = await fetch("/api/subjects").then((r) => r.json());
      setSubjects(refreshed.subjects);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {message && (
          <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded text-center">
            {message}
          </div>
        )}

        {/* Create Subject */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">+ New Subject</h2>
          <form onSubmit={handleCreateSubject} className="flex gap-3">
            <input
              type="text"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              placeholder="Subject name (e.g. C Programming)"
              className="flex-1 border rounded-lg px-3 py-2"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              Create
            </button>
          </form>
        </section>

        {/* Add / Edit Program */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            {editing ? "Edit Program" : "Add Code / Publish Program"}
          </h2>
          <form onSubmit={handleAddOrUpdateProgram} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                required
                disabled={!!editing}
              >
                <option value="">Select subject...</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Program Title
              </label>
              <input
                type="text"
                value={programTitle}
                onChange={(e) => setProgramTitle(e.target.value)}
                placeholder="e.g. Factorial of a Number"
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <select
                value={programLanguage}
                onChange={(e) => setProgramLanguage(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="C">C</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Code</label>
              <textarea
                value={programCode}
                onChange={(e) => setProgramCode(e.target.value)}
                rows={12}
                placeholder="Paste your code here..."
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700"
              >
                {editing ? "Update Program" : "Publish Code"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setProgramTitle("");
                    setProgramCode("");
                    setSelectedSubjectId("");
                  }}
                  className="bg-gray-200 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* List Subjects & Programs */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">All Subjects & Programs</h2>
          {subjects.length === 0 ? (
            <p className="text-gray-500">No subjects yet.</p>
          ) : (
            <div className="space-y-6">
              {subjects.map((subject) => (
                <div key={subject.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{subject.name}</h3>
                    <button
                      onClick={() => handleDeleteSubject(subject.id)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Delete Subject
                    </button>
                  </div>
                  {subject.programs.length === 0 ? (
                    <p className="text-sm text-gray-400">No programs</p>
                  ) : (
                    <ul className="space-y-2">
                      {subject.programs.map((p) => (
                        <li
                          key={p.id}
                          className="flex items-center justify-between bg-gray-50 rounded px-3 py-2 text-sm"
                        >
                          <span>
                            {p.title}{" "}
                            <span className="text-gray-400">({p.language})</span>
                          </span>
                          <div className="flex gap-3">
                            <button
                              onClick={() => startEdit(subject.id, p.id)}
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteProgram(subject.id, p.id)
                              }
                              className="text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
