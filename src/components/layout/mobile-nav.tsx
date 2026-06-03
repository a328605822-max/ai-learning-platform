"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/modules/module-1", label: "模块一" },
  { href: "/modules/module-2", label: "模块二" },
  { href: "/modules/module-3", label: "模块三" },
  { href: "/modules/module-4", label: "模块四" },
  { href: "/modules/module-5", label: "模块五" },
  { href: "/labs", label: "实验室" },
  { href: "/toolbox", label: "工具箱" },
  { href: "/parenting", label: "育儿" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} className="fixed top-3 left-3 z-50">
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col items-center justify-center h-full gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-xl font-medium transition-colors hover:text-primary",
                  pathname === item.href && "text-primary font-bold"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
