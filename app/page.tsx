import { sendOTP } from "@/actions/actions";

export default function Home() {
  async function handleSubmit(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;

    await sendOTP(email);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form action={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          name="email"
          type="email"
          placeholder="Enter Email"
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-black text-white p-2 rounded"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}