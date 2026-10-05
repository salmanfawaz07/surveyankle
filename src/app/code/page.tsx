import Link from "next/link";
import { getSubjects } from "@/lib/store";

export const dynamic = "force-dynamic";

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
          <div className="space-y-6">
            {subjects.map((subject) => (
              <section
                key={subject.id}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {subject.name}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {subject.programs.length} program
                    {subject.programs.length !== 1 ? "s" : ""}
                  </span>
                </div>
                {subject.programs.length === 0 ? (
                  <p className="pt-4 text-sm text-gray-500">No programs published yet.</p>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {subject.programs.map((program) => (
                      <li key={program.id} className="py-4 first:pt-4 last:pb-0">
                        <details>
                          <summary className="cursor-pointer list-inside flex flex-wrap items-center justify-between gap-2 font-medium text-gray-900">
                            <span>{program.title}</span>
                            <span className="text-xs font-normal text-gray-500">
                              {program.language}
                            </span>
                          </summary>
                          <pre className="mt-3 max-h-96 overflow-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
                            <code>{program.code}</code>
                          </pre>
                          <Link
                            href={`/code/${subject.id}/${program.id}`}
                            className="mt-3 inline-block text-sm font-medium text-blue-700 hover:underline"
                          >
                            Open full program
                          </Link>
                        </details>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
