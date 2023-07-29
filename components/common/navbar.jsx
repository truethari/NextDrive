"use client";

import React from "react";
import Link from "next/link";

import { Moon, Sun, Github } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function NavBar() {
  return (
    <nav className="bg-white shadow dark:bg-zinc-900 fixed top-0 left-0 w-full h-14 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            NextDrive
          </span>
        </Link>

        <div className="flex items-center md:order-2">
          <div className="mr-2">
            <ModeToggle />
          </div>
          <div className="cursor-pointer">
            <a
              href="https://github.com/truethari/NextDrive"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-[1rem] w-[1rem]" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
