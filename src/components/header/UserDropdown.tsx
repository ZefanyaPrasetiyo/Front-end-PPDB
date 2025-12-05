"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const user = session?.user;

  // BUAT INISIAL DARI NAMA
  const getInitial = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400"
      >
        {/* AVATAR IMAGE / INISIAL */}
        <span className="mr-3 rounded-full h-11 w-11 overflow-hidden flex items-center justify-center bg-gray-200 text-gray-700 font-semibold text-sm">
          {user?.image ? (
            <Image
              width={44}
              height={44}
              src={user.image}
              alt="User Avatar"
            />
          ) : (
            getInitial(user?.name)
          )}
        </span>

        <span className="block mr-1 font-medium text-theme-sm">
          {user?.name ?? "User"}
        </span>

        <svg
          className={`stroke-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg"
      >
        {/* User Info */}
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm">
            {user?.name ?? "User Name"}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500">
            {user?.email ?? "no-email@example.com"}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-theme-sm"
            >
              Edit profile
            </DropdownItem>
          </li>
        </ul>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-3 py-2 mt-3 rounded-lg hover:bg-gray-100 text-theme-sm"
        >
          Sign out
        </button>
      </Dropdown>
    </div>
  );
}
