"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toggleWatched } from "@/actions/actions";

export default function WatchedCheckbox({
  id,
  watched,
}: {
  id: string;
  watched: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <input
      type="checkbox"
      checked={watched}
      disabled={pending}
      onChange={() => {
        startTransition(async () => {
          await toggleWatched(id);
          router.refresh();
        });
      }}
    />
  );
}
