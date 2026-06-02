import { addMovie } from "@/actions/actions";

export default function AddMoviePage() {
  return (
    <div className="min-h-screen bg-[#110e1a] text-[#D3D3FF] antialiased flex flex-col justify-center items-center px-4 sm:px-6 py-12 selection:bg-[#9400D3] selection:text-white">
      <div className="w-full max-w-md">
        
        {/* BACK NAVIGATION */}
        <div className="mb-4">
          <a
            href="/dashboard"
            className="text-[10px] font-black uppercase tracking-widest text-[#D3D3FF]/40 hover:text-[#ED80E9] transition-colors"
          >
            &larr; Back to Catalog
          </a>
        </div>

        {/* FORM CONTAINER CARD */}
        <div className="bg-[#D8BFD8]/5 border border-[#D8BFD8]/10 rounded-xl p-6 md:p-8 shadow-xl relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r from-[#D3D3FF] via-[#ED80E9] to-[#9400D3]">
          
          <header className="mb-6 text-center">
            <h1 className="text-xl font-black uppercase tracking-wider text-[#D3D3FF]">
              Ingest Title //
            </h1>
            <p className="text-[#D3D3FF]/40 text-xs mt-0.5">Append a new record element to your cinema log.</p>
          </header>

          <form action={addMovie} className="space-y-4">
            
            {/* MOVIE TITLE */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D3D3FF]/50 mb-1.5">
                Movie Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Dune: Part Two"
                required
                className="w-full bg-[#161324] border border-[#D8BFD8]/20 rounded-md px-3 py-2 text-sm text-[#D3D3FF] placeholder-[#D3D3FF]/20 focus:outline-none focus:border-[#ED80E9] focus:ring-1 focus:ring-[#ED80E9] transition-all"
              />
            </div>

            {/* ARTWORK / POSTER IMAGE UPLOAD */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D3D3FF]/50 mb-1.5">
                Media Artwork / Poster Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className="w-full bg-[#161324] border border-[#D8BFD8]/20 rounded-md text-sm text-[#D3D3FF]/60 focus:outline-none focus:border-[#ED80E9] transition-all
                  file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0
                  file:text-xs file:font-bold file:uppercase file:tracking-wider
                  file:bg-[#9400D3]/20 file:text-[#D3D3FF]
                  hover:file:bg-[#9400D3]/40 file:transition-colors file:cursor-pointer"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D3D3FF]/50 mb-1.5">
                Plot Summary / Review Abstract
              </label>
              <textarea
                name="description"
                placeholder="Log a concise description summary or personal synopsis details..."
                required
                rows={3}
                className="w-full bg-[#161324] border border-[#D8BFD8]/20 rounded-md px-3 py-2 text-sm text-[#D3D3FF] placeholder-[#D3D3FF]/20 focus:outline-none focus:border-[#ED80E9] focus:ring-1 focus:ring-[#ED80E9] transition-all resize-none leading-relaxed"
              />
            </div>

            {/* LOGGED WATCH DATE */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D3D3FF]/50 mb-1.5">
                Logged Watch Timestamp
              </label>
              <input
                type="date"
                name="watchDate"
                required
                className="w-full bg-[#161324] border border-[#D8BFD8]/20 rounded-md px-3 py-2 text-sm text-[#D3D3FF] focus:outline-none focus:border-[#ED80E9] focus:ring-1 focus:ring-[#ED80E9] transition-all scheme-dark"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center bg-[#9400D3] hover:bg-[#ED80E9] text-white font-black text-xs uppercase tracking-wider h-10 rounded-md transition-all shadow-md shadow-[#9400D3]/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                Commit to Shelf
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
