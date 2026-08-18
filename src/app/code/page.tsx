import Link from "next/link";
import { getSubjects } from "@/lib/store";

export default function CodePage() {
  const subjects = getSubjects();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple clean navbar */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-800">
            Daily<span className="text-orange-500">Zap</span>
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-black">
              Home
            </Link>
            <Link href="/code" className="font-semibold text-blue-600">
              Code
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Code</h1>
        <p className="text-gray-600 mb-8">
          Simple programming programs. Click a subject to view codes.
        </p>

        {subjects.length === 0 ? (
          <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
            No subjects yet. Admin can add them from /admin.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/code/${subject.id}`}
                className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {subject.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {subject.programs.length} program
                  {subject.programs.length !== 1 ? "s" : ""}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
