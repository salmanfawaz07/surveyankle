import Link from "next/link";
import { getSubject } from "@/lib/store";
import { notFound } from "next/navigation";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectId } = await params;
  const subject = getSubject(subjectId);

  if (!subject) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-800">
            Daily<span className="text-orange-500">Zap</span>
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-black">
              Home
            </Link>
            <Link href="/code" className="text-gray-600 hover:text-black">
              Code
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/code" className="hover:underline">
            Code
          </Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900">{subject.name}</span>
        </div>

        <h1 className="text-3xl font-bold mb-6">{subject.name}</h1>

        {subject.programs.length === 0 ? (
          <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
            No programs in this subject yet.
          </div>
        ) : (
          <ul className="space-y-3">
            {subject.programs.map((program) => (
              <li key={program.id}>
                <Link
                  href={`/code/${subject.id}/${program.id}`}
                  className="block bg-white border border-gray-200 rounded-lg px-5 py-4 hover:border-blue-400 hover:shadow-sm transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {program.title}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {program.language}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
