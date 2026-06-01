import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { addMovie, logout } from "@/actions/actions";

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const session = cookieStore.get("session")?.value;

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Dashboard 🎬</h1>

      <form action={logout}>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </form>

      <form
        action={addMovie}
        className="flex flex-col gap-3 w-96"
      >
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
          name="watchDate"
          type="date"
          className="border p-2 rounded"
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Movie
        </button>
      </form>
    </div>
  );
}
