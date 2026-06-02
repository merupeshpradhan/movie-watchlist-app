import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { logout, deleteMovie } from "@/actions/actions";
import WatchedCheckbox from "@/app/components/WatchedCheckbox";
import SearchBox from "@/app/components/SearchBox";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string }>;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    redirect("/");
  }

  const resolvedParams = await searchParams;
  const search = resolvedParams?.search || "";

  const movies = await prisma.movie.findMany({
    where: {
      userId: session,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalMovies = movies.length;
  const watchedMovies = movies.filter((m) => m.watched).length;
  const notWatchedMovies = totalMovies - watchedMovies;

  return (
    /* WISTERIA APP WRAPPER: Deep charcoal-midnight base layer mixed with premium ice lavender #D3D3FF text typography */
    <div className="min-h-screen bg-[#110e1a] text-[#D3D3FF] antialiased selection:bg-[#9400D3] selection:text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER BRAND BAR */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#D8BFD8]/15 pb-6 mb-6">
          <div>
            <h1 className="text-2xl font-black tracking-wider uppercase bg-gradient-to-r from-[#D3D3FF] via-[#ED80E9] to-[#9400D3] bg-clip-text text-transparent">
              CineTrack //
            </h1>
            <p className="text-[#D3D3FF]/40 text-[11px] uppercase tracking-widest mt-0.5">
              Personal Motion Picture Database
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/dashboard/add-movie"
              className="inline-flex items-center justify-center bg-[#9400D3] hover:bg-[#ED80E9] text-white font-bold text-xs px-4 py-2 rounded-md transition-all shadow-md shadow-[#9400D3]/20 active:scale-[0.98]"
            >
              + ADD TITLE
            </a>

            <form action={logout}>
              <button className="inline-flex items-center justify-center bg-[#D8BFD8]/10 hover:bg-[#D8BFD8]/20 border border-[#D8BFD8]/30 text-[#D3D3FF]/70 font-bold text-xs px-4 py-2 rounded-md transition-all">
                LOGOUT
              </button>
            </form>
          </div>
        </header>

        {/* METRIC BOX OVERVIEW */}
        <section
          className="grid grid-cols-3 gap-3 mb-8"
          aria-label="Statistics"
        >
          <div className="bg-[#D8BFD8]/5 border border-[#D8BFD8]/10 rounded-xl p-3 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#D3D3FF]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#D3D3FF]/40">
              Total
            </p>
            <p className="text-xl font-black text-[#D3D3FF] mt-0.5">
              {totalMovies}
            </p>
          </div>

          <div className="bg-[#D8BFD8]/5 border border-[#D8BFD8]/10 rounded-xl p-3 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#ED80E9]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#ED80E9]">
              Watched
            </p>
            <p className="text-xl font-black text-[#ED80E9] mt-0.5">
              {watchedMovies}
            </p>
          </div>

          <div className="bg-[#D8BFD8]/5 border border-[#D8BFD8]/10 rounded-xl p-3 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#9400D3]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9400D3]">
              Queue
            </p>
            <p className="text-xl font-black text-[#D3D3FF]/80 mt-0.5">
              {notWatchedMovies}
            </p>
          </div>
        </section>

        {/* CONTROLS HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#D3D3FF]/40">
            {search ? `Query / "${search}"` : "Index / Collection"}
          </h2>
          <div className="w-full sm:w-64">
            <SearchBox />
          </div>
        </div>

        {/* MOVIES DATA STREAM */}
        {movies.length === 0 ? (
          <div className="text-center py-12 bg-[#D8BFD8]/5 border border-[#D8BFD8]/10 rounded-xl">
            <p className="text-[#D3D3FF]/40 text-xs uppercase tracking-wider">
              No catalog records match query.
            </p>
          </div>
        ) : (
          <main className="space-y-2">
            {movies.map((movie) => (
              <article
                key={movie.id}
                className="group flex items-center bg-[#D8BFD8]/5 border border-[#D8BFD8]/10 hover:bg-[#D8BFD8]/10 hover:border-[#D8BFD8]/20 rounded-xl p-2.5 transition-all duration-150 gap-4"
              >
                {/* REAL-WORLD FIX: Locked layout bounding block container */}
                <img
                  src={movie.imageUrl || "https://unsplash.com"}
                  alt={movie.title}
                  loading="lazy"
                  className="w-[5vw] object-cover transition-transform duration-200 group-hover:scale-105"
                />

                {/* TEXT & ACTIONS BLOCK */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between flex-1 min-w-0 gap-2">
                  {/* Left Side Metadata */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-bold text-[#D3D3FF] truncate group-hover:text-[#ED80E9] transition-colors">
                        {movie.title}
                      </h3>
                      <span className="text-[10px] font-mono text-[#D3D3FF]/30 hidden md:inline">
                        //{" "}
                        {new Date(movie.watchDate).toLocaleDateString(
                          undefined,
                          { dateStyle: "short" },
                        )}
                      </span>
                    </div>
                    <p className="text-xs text-[#D3D3FF]/50 truncate mt-0.5 max-w-xl">
                      {movie.description || "No metadata summary available."}
                    </p>
                  </div>

                  {/* Right Side Control Panel */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 flex-shrink-0 border-t sm:border-t-0 border-[#D8BFD8]/10 pt-2 sm:pt-0">
                    {/* Status Toggle Wrapper */}
                    <div className="flex items-center scale-90 opacity-80 hover:opacity-100 transition-opacity">
                      <WatchedCheckbox id={movie.id} watched={movie.watched} />
                    </div>

                    {/* Operational Triggers */}
                    <div className="flex items-center gap-2">
                      {/* VIEW DETAILS / OPEN BUTTON */}
                      <a
                        href={`/dashboard/movie/${movie.id}`}
                        className="inline-flex items-center justify-center h-7 px-3 text-[10px] font-black uppercase tracking-wider bg-[#D8BFD8]/10 hover:bg-[#9400D3] border border-[#D8BFD8]/20 hover:border-[#9400D3] text-[#D3D3FF] hover:text-white rounded-md transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Open
                      </a>

                      {/* DROP / DELETE BUTTON */}
                      <form action={deleteMovie.bind(null, movie.id)}>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center h-7 px-3 text-[10px] font-black uppercase tracking-wider bg-red-500/5 hover:bg-red-950/60 border border-red-500/10 hover:border-red-500/40 text-red-400/70 hover:text-red-400 rounded-md transition-all duration-150 active:scale-[0.98]"
                        >
                          Drop
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </main>
        )}
      </div>
    </div>
  );
}
