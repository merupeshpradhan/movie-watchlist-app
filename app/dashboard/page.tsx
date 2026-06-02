import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { addMovie, logout, deleteMovie } from "@/actions/actions";
import WatchedCheckbox from "@/app/components/WatchedCheckbox";
import SearchBox from "@/app/components/SearchBox"; // Ensure this component is created

export default async function DashboardPage({
  searchParams,
}: {
  // Fix: searchParams must be a Promise in Next.js 15+
  searchParams?: Promise<{ search?: string }>;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    redirect("/");
  }

  // Fix: Await the search parameters before using them
  const resolvedParams = await searchParams;
  const search = resolvedParams?.search || "";

  const movies = await prisma.movie.findMany({
    where: {
      userId: session,
      title: {
        contains: search,
        mode: "insensitive", // Matches lowercase and uppercase typing
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
    <div className="min-h-screen p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard 🎬</h1>

        <div className="flex gap-3">
          <a
            href="/dashboard/add-movie"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Movie
          </a>

          <form action={logout}>
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          </form>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border p-4 rounded shadow">
          <h2 className="font-bold">🎬 Total</h2>
          <p className="text-2xl">{totalMovies}</p>
        </div>

        <div className="border p-4 rounded shadow">
          <h2 className="font-bold">✅ Watched</h2>
          <p className="text-2xl">{watchedMovies}</p>
        </div>

        <div className="border p-4 rounded shadow">
          <h2 className="font-bold">⏳ Not Watched</h2>
          <p className="text-2xl">{notWatchedMovies}</p>
        </div>
      </div>
      
      {/* MOVIES LIST */}
      <h2 className="text-2xl font-bold mb-5">My Movies 🎥</h2>

      {/* UPDATED: Instant Client Search Box */}
      <SearchBox />

      {movies.length === 0 ? (
        <p className="text-gray-500">No movies found matching "{search}"</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {movies.map((movie) => (
            <div key={movie.id} className="border rounded p-4 shadow">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-60 object-cover rounded"
              />

              <WatchedCheckbox id={movie.id} watched={movie.watched} />

              <h3 className="text-xl font-bold mt-3">{movie.title}</h3>

              <p>{movie.description}</p>

              <p>{new Date(movie.watchDate).toLocaleDateString()}</p>

              {/* VIEW DETAILS */}
              <a
                href={`/dashboard/movie/${movie.id}`}
                className="bg-green-500 text-white px-4 py-2 rounded inline-block mt-2"
              >
                View Details
              </a>

              {/* DELETE */}
              <form action={deleteMovie.bind(null, movie.id)} className="mt-4">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
