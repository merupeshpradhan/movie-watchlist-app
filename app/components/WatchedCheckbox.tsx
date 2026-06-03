"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { toggleWatched } from "@/actions/actions";
import toast from "react-hot-toast";

export default function WatchedCheckbox({
  id,
  watched,
}: {
  id: string;
  watched: boolean;
}) {
  // 1. Control the state locally so it changes instantly on the screen
  const [isWatched, setIsWatched] = useState(watched);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  // Keep local state synchronized if data changes from outside (like a page reload)
  useEffect(() => {
    setIsWatched(watched);
  }, [watched]);

  const handleChange = () => {
    const nextState = !isWatched;

    // 2. Flip the state in the UI immediately without waiting for the server
    setIsWatched(nextState);

    const loadingToast = toast.loading("Saving changes...");

    startTransition(async () => {
      try {
        await toggleWatched(id);
        toast.dismiss(loadingToast);
        toast.success(nextState ? "Marked as Watched ✅" : "Moved to Queue ⏳");

        // Refresh server data in the background
        router.refresh();
      } catch (error) {
        // 3. Revert back to the old state if the backend database query fails
        setIsWatched(!nextState);
        toast.dismiss(loadingToast);
        toast.error("Failed to update status on server ❌");
      }
    });
  };

  return (
    <div className="flex items-center gap-2 select-none">
      <input
        type="checkbox"
        checked={isWatched} // Updated: Use local state variable here
        disabled={pending}
        onChange={handleChange}
        className="w-4 h-4 cursor-pointer accent-[#9400D3] rounded"
      />
      <span className="text-xs font-mono tracking-wider uppercase text-[#D3D3FF]/70">
        {isWatched ? "✅ Watched" : "⏳ Not Watched"}
      </span>
    </div>
  );
}
