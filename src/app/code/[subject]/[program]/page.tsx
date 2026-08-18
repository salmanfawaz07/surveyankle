import Link from "next/link";
import { getSubject, getProgram } from "@/lib/store";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ subject: string; program: string }>;
}) {
  const { subject: subjectId, program: programId } = await params;
  const subject = getSubject(subjectId);
  const program = getProgram(subjectId, programId);

  if (!subject || !program) {
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
          <Link href={`/code/${subject.id}`} className="hover:underline">
            {subject.name}
          </Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900">{program.title}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-2">{program.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          Language: <span className="font-medium">{program.language}</span>
        </p>

        {/* Code block */}
        <div className="bg-gray-900 rounded-xl overflow-hidden mb-6 shadow-lg">
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 flex justify-between">
            <span>{program.language}</span>
            <span>code</span>
          </div>
          <pre className="p-4 md:p-6 text-sm text-gray-100 overflow-x-auto">
            <code>{program.code}</code>
          </pre>
        </div>

        {/* Copy button */}
        <div className="flex justify-center md:justify-start">
          <CopyButton code={program.code} />
        </div>
      </main>
    </div>
  );
}
