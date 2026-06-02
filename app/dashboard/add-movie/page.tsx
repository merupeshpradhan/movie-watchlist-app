import { addMovie } from "@/actions/actions";

export default function AddMoviePage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        action={addMovie}
        className="flex flex-col gap-3 w-96 border p-6 rounded shadow"
      >
        <h1 className="text-2xl font-bold text-center">Add Movie 🎬</h1>

        <input
          name="title"
          placeholder="Movie Title"
          className="border p-2 rounded"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded"
          required
        />

        <input
          type="date"
          name="watchDate"
          className="border p-2 rounded"
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Movie
        </button>
      </form>
      <a
          href="/dashboard"
          className="inline-block mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        >
          ← Back to Dashboard
        </a>
    </div>
  );
}
