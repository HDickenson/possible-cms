"use client";

import { ChevronRight, User } from "lucide-react";
import { usePathname } from "next/navigation";

function getBreadcrumb(pathname: string): string[] {
  if (pathname === "/") return ["Dashboard"];
  return pathname
    .split("/")
    .filter(Boolean)
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1));
}

export function TopBar() {
  const pathname = usePathname();
  const crumbs = getBreadcrumb(pathname);

  return (
    <header className="flex h-[var(--topbar-height)] items-center justify-between border-b border-border bg-surface-raised px-4">
      <div className="flex items-center gap-1 text-sm text-text-secondary">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={14} className="text-text-muted" />}
            <span
              className={
                i === crumbs.length - 1
                  ? "font-medium text-text-primary"
                  : undefined
              }
            >
              {crumb}
            </span>
          </span>
        ))}
      </div>
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-sunken text-text-secondary transition-colors duration-150 hover:bg-zinc-200"
        aria-label="User menu"
      >
        <User size={16} />
      </button>
    </header>
  );
}
