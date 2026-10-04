"use client";

import { usePathname } from "next/navigation";
import { archive2024Paths } from "@/lib/site";

// Acknowledgement required by Microsoft CMT (wording supplied by CMT; keep verbatim).
// Sits above the sticky header and scrolls away. Hidden on 2024 archive pages, which have their own notice.
export default function CmtNotice() {
  const path = usePathname();
  if (archive2024Paths.includes(path.endsWith("/") ? path : `${path}/`)) return null;

  return (
    <aside aria-label="Peer review acknowledgement" className="border-b border-primary/10 bg-leaf">
      <p className="mx-auto max-w-6xl px-4 py-2 text-center text-xs leading-relaxed text-ink/70 sm:text-[13px]">
        The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was
        provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for
        software development and support.
      </p>
    </aside>
  );
}
