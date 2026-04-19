"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Database,
  Image,
  Bot,
  ClipboardList,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pages", label: "Pages", icon: FileText },
  { href: "/content", label: "Content", icon: Database },
  { href: "/media", label: "Media", icon: Image },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/audit", label: "Audit", icon: ClipboardList },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[var(--sidebar-width)] flex-col border-r border-border bg-surface-raised">
      <div className="flex h-[var(--topbar-height)] items-center px-4">
        <span className="text-base font-semibold text-text-primary">
          Possible CMS
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-2 py-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-150",
                isActive
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-text-secondary hover:bg-surface-sunken hover:text-text-primary",
              )}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
