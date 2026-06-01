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
    return <h1>Movie Not Found</h1>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Edit Movie
      </h1>

      <form action={updateMovie.bind(null, movie.id)}>
        <input
          name="title"
          defaultValue={movie.title}
          className="border p-2 rounded block mb-3"
        />

        <textarea
          name="description"
          defaultValue={movie.description}
          className="border p-2 rounded block mb-3"
        />

        <input
          type="date"
          name="watchDate"
          defaultValue={
            movie.watchDate
              .toISOString()
              .split("T")[0]
          }
          className="border p-2 rounded block mb-3"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
}