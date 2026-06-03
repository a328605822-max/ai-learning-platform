import { TableOfContents } from "@/components/layout/table-of-contents";
import type { ReactNode } from "react";

export default function ModulesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div className="lg:mr-56">{children}</div>
      <TableOfContents />
    </div>
  );
}
