import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movie = await prisma.movie.findUnique({
    where: {
      id,
    },
  });

  if (!movie) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#110e1a] text-[#D3D3FF] antialiased selection:bg-[#9400D3] selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* BACK TO DASHBOARD NAVIGATION BAR */}
        <div className="mb-6">
          <a
            href="/dashboard"
            className="text-[10px] font-black uppercase tracking-widest text-[#D3D3FF]/40 hover:text-[#ED80E9] transition-colors"
          >
            &larr; Return to Library
          </a>
        </div>

        {/* MAIN CINEMATIC CONTAINER */}
        <div className="bg-[#D8BFD8]/5 border border-[#D8BFD8]/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 p-6 md:p-8">
            {/* LEFT COLUMN: STANDARDIZED POSTER WRAPPER */}
            <div className="md:col-span-2">
              <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-[#161324] border border-[#D8BFD8]/15 shadow-lg">
                <img
                  src={movie.imageUrl || "https://unsplash.com"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: METADATA & ACTIONS */}
            <div className="md:col-span-3 flex flex-col justify-between">
              <div>
                {/* TITLE & HEADER */}
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#D3D3FF] to-[#ED80E9]">
                  {movie.title}
                </h1>

                {/* STATUS BADGE STRIP */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center h-5 px-2 text-[9px] font-black uppercase tracking-wider rounded-md border ${
                      movie.watched
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-[#ED80E9]/10 border-[#ED80E9]/20 text-[#ED80E9]"
                    }`}
                  >
                    {movie.watched ? "● Completed" : "○ In Queue"}
                  </span>
                </div>

                {/* DESCRIPTION SUMMARY */}
                <p className="mt-5 text-sm text-[#D3D3FF]/70 font-medium leading-relaxed border-t border-[#D8BFD8]/10 pt-4">
                  {movie.description ||
                    "No catalog synopsis abstract logs registered for this entry item."}
                </p>

                {/* HISTORICAL TIMESTAMPS SUMMARY GRID */}
                <div className="mt-6 bg-[#161324]/50 border border-[#D8BFD8]/5 rounded-xl p-4 space-y-2.5 font-mono text-[11px]">
                  <div className="flex justify-between border-b border-[#D8BFD8]/5 pb-2">
                    <span className="text-[#D3D3FF]/30 uppercase tracking-wider">
                      Logged Watch Date
                    </span>
                    <span className="text-[#D3D3FF]/80">
                      {new Date(movie.watchDate).toLocaleDateString(undefined, {
                        dateStyle: "medium",
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#D3D3FF]/30 uppercase tracking-wider">
                      Record Ingest Timestamp
                    </span>
                    <span className="text-[#D3D3FF]/80">
                      {new Date(movie.createdAt).toLocaleDateString(undefined, {
                        dateStyle: "medium",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* FOOTER ACTIONS COMPONENT ROW */}
              <div className="mt-8 pt-4 border-t border-[#D8BFD8]/10 flex items-center justify-end gap-3">
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center h-9 px-4 text-xs font-bold bg-[#D8BFD8]/5 hover:bg-[#D8BFD8]/10 border border-[#D8BFD8]/15 text-[#D3D3FF]/70 hover:text-[#D3D3FF] rounded-md transition-all"
                >
                  Dismiss
                </a>

                <a
                  href={`/dashboard/edit/${movie.id}`}
                  className="inline-flex items-center justify-center h-9 px-5 text-xs font-black uppercase tracking-wider bg-[#9400D3] hover:bg-[#ED80E9] text-white rounded-md transition-all shadow-md shadow-[#9400D3]/20 hover:scale-[1.01] active:scale-[0.99]"
                >
                  Edit Entry
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
