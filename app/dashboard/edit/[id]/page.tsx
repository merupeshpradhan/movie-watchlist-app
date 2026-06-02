import { prisma } from "@/lib/prisma";
import { updateMovie } from "@/actions/actions";

export default async function EditMoviePage({
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
    return (
      <div className="min-h-screen bg-[#110e1a] text-[#D3D3FF] flex items-center justify-center p-6">
        <div className="bg-[#D8BFD8]/5 border border-[#D8BFD8]/10 rounded-xl p-8 max-w-sm text-center shadow-xl">
          <span className="text-3xl">🍿</span>
          <h1 className="text-xl font-black uppercase tracking-wider mt-3 text-[#ED80E9]">
            Movie Not Found
          </h1>
          <p className="text-xs text-[#D3D3FF]/50 mt-2">
            The database record you are trying to modify does not exist or has been dropped.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center bg-[#9400D3] hover:bg-[#ED80E9] text-white font-bold text-xs px-4 py-2.5 rounded-md transition-all mt-5 w-full"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#110e1a] text-[#D3D3FF] antialiased selection:bg-[#9400D3] selection:text-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
        
        {/* BACK NAVIGATION */}
        <div className="mb-6">
          <a
            href="/dashboard"
            className="text-xs font-bold uppercase tracking-widest text-[#D3D3FF]/40 hover:text-[#ED80E9] transition-colors"
          >
            &larr; Back to Library
          </a>
        </div>

        {/* COMPACT LAYER CARD CONTAINER */}
        <div className="bg-[#D8BFD8]/5 border border-[#D8BFD8]/10 rounded-xl p-6 md:p-8 shadow-xl relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r from-[#D3D3FF] via-[#ED80E9] to-[#9400D3]">
          
          <header className="mb-6">
            <h1 className="text-xl font-black uppercase tracking-wider text-[#D3D3FF]">
              Modify Metadata //
            </h1>
            <p className="text-[#D3D3FF]/40 text-xs mt-0.5">Updating entry tracking parameters for: <span className="text-[#ED80E9] italic">"{movie.title}"</span></p>
          </header>

          <form action={updateMovie.bind(null, movie.id)} className="space-y-4">
            
            {/* MOVIE TITLE INPUT */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D3D3FF]/50 mb-1.5">
                Title Listing
              </label>
              <input
                type="text"
                name="title"
                defaultValue={movie.title}
                placeholder="e.g., Blade Runner 2049"
                required
                className="w-full bg-[#161324] border border-[#D8BFD8]/20 rounded-md px-3 py-2 text-sm text-[#D3D3FF] placeholder-[#D3D3FF]/20 focus:outline-none focus:border-[#ED80E9] focus:ring-1 focus:ring-[#ED80E9] transition-all"
              />
            </div>

            {/* DESCRIPTION TEXTAREA */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D3D3FF]/50 mb-1.5">
                Metadata Summary / Description
              </label>
              <textarea
                name="description"
                defaultValue={movie.description || ""}
                placeholder="Provide a brief abstract summary or personal thoughts..."
                rows={4}
                className="w-full bg-[#161324] border border-[#D8BFD8]/20 rounded-md px-3 py-2 text-sm text-[#D3D3FF] placeholder-[#D3D3FF]/20 focus:outline-none focus:border-[#ED80E9] focus:ring-1 focus:ring-[#ED80E9] transition-all resize-none leading-relaxed"
              />
            </div>

            {/* WATCH DATE SELECTION */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D3D3FF]/50 mb-1.5">
                Catalog Logged Date
              </label>
              <input
                type="date"
                name="watchDate"
                defaultValue={movie.watchDate.toISOString().split("T")[0]}
                required
                className="w-full bg-[#161324] border border-[#D8BFD8]/20 rounded-md px-3 py-2 text-sm text-[#D3D3FF] focus:outline-none focus:border-[#ED80E9] focus:ring-1 focus:ring-[#ED80E9] transition-all scheme-dark"
              />
            </div>

            {/* ACTION TRIGGERS */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center bg-[#D8BFD8]/10 hover:bg-[#D8BFD8]/20 border border-[#D8BFD8]/30 text-[#D3D3FF]/70 font-bold text-xs h-9 px-4 rounded-md transition-all"
              >
                Cancel
              </a>
              
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-[#9400D3] hover:bg-[#ED80E9] text-white font-bold text-xs h-9 px-5 rounded-md transition-all shadow-md shadow-[#9400D3]/20 active:scale-[0.98]"
              >
                Commit Changes
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
