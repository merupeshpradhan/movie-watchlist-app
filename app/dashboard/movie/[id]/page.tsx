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
    <div className="min-h-screen p-10">
      <div className="max-w-3xl mx-auto border rounded-lg shadow p-6">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-[500px] object-cover rounded"
        />

        <h1 className="text-4xl font-bold mt-6">{movie.title}</h1>

        <p className="mt-4 text-gray-700">{movie.description}</p>

        <div className="mt-6 space-y-2">
          <p>
            <strong>Watch Date:</strong>{" "}
            {new Date(movie.watchDate).toLocaleDateString()}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {movie.watched ? "✅ Watched" : "⏳ Not Watched"}
          </p>

          <p>
            <strong>Created At:</strong>{" "}
            {new Date(movie.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* EDIT */}
        <a
          href={`/dashboard/edit/${movie.id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded inline-block mt-2 ml-2"
        >
          Edit
        </a>

        <a
          href="/dashboard"
          className="inline-block mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        >
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}
