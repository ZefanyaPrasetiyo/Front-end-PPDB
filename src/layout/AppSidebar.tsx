"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { useSession } from "next-auth/react";

import {
  GridIcon,
  UserCircleIcon,
  ListIcon,
  TableIcon,
  PageIcon,
  ChevronDownIcon,
  HorizontaLDots,
} from "@/icons";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  roles?: string[];
  subItems?: {
    name: string;
    path: string;
    icon?: React.ReactNode;
    roles?: string[];
  }[];
};

const navMain: NavItem[] = [
  { icon: <UserCircleIcon />, 
    name: "Beranda", 
    path: "/user", 
    roles: ["calon_siswa"] },
  { 
    icon: <UserCircleIcon />, 
    name: "PPDB", 
    path: "/user/ppdb", 
    roles: ["calon_siswa"] },
  { 
    icon: <UserCircleIcon />, 
    name: "Panduan", 
    path: "/user/panduan", 
    roles: ["calon_siswa"] },
  { 
    icon: <GridIcon />, 
    name: "Dashboard", 
    path: "/profile", 
    roles: ["admin"] },
  { 
    icon: <TableIcon />, 
    name: "Table User", path: 
    "/profile", 
    roles: ["admin"] },
  { 
    icon: <UserCircleIcon />, 
    name: "User Profile", 
    path: "/profile", 
    roles: ["calon_siswa", "tu", "admin"] },
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/", icon: <GridIcon />, roles: ["tu"] }],
    roles: ["tu"],
  },
  {
    icon: <TableIcon />,
    name: "Tables",
    subItems: [
      { name: "Calon siswa", path: "/basic-tables", icon: <TableIcon /> },
      { name: "Pembayaran", path: "/basic-tables", icon: <TableIcon /> },
    ],
    roles: ["tu"],
  },
];

const navAnother: NavItem[] = [
  { icon: <PageIcon />, name: "Riwayat", path: "/laporan", roles: ["calon_siswa"] },
  {
    icon: <ListIcon />,
    name: "Pengaturan",
    subItems: [
      { name: "Akun", path: "/pengaturan/akun", icon: <UserCircleIcon />, roles: ["admin"] },
      { name: "Notifikasi", path: "/pengaturan/notifikasi", icon: <ListIcon />, roles: ["admin", "tu"] },
    ],
    roles: ["admin", "tu"],
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role || "calon_siswa";

  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();

  const [open, setOpen] = useState<{ index: number; type: "main" | "another" } | null>(null);
  const submenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [submenuHeight, setSubmenuHeight] = useState<Record<string, number>>({});

  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  const filterByRole = (items: NavItem[]) =>
    items
      .filter((item) => !item.roles || item.roles.includes(role))
      .map((item) => ({
        ...item,
        subItems: item.subItems
          ? item.subItems.filter((sub) => !sub.roles || sub.roles.includes(role))
          : undefined,
      }));

  const filteredMain = filterByRole(navMain);
  const filteredAnother = filterByRole(navAnother);

  useEffect(() => {
    filteredMain.forEach((item, i) => {
      item.subItems?.forEach((sub) => {
        if (sub.path === pathname) setOpen({ index: i, type: "main" });
      });
    });
    filteredAnother.forEach((item, i) => {
      item.subItems?.forEach((sub) => {
        if (sub.path === pathname) setOpen({ index: i, type: "another" });
      });
    });
  }, [pathname, filteredMain, filteredAnother]);

  useEffect(() => {
    if (!open) return;
    const key = `${open.type}-${open.index}`;
    const el = submenuRefs.current[key];
    if (el) setSubmenuHeight((prev) => ({ ...prev, [key]: el.scrollHeight }));
  }, [open]);

  const renderMenu = (items: NavItem[], type: "main" | "another") => (
    <ul className="flex flex-col gap-4">
      {items.map((item, i) => {
        const key = `${type}-${i}`;
        const isOpen = open?.type === type && open?.index === i;

        return (
          <li key={i}>
            {item.path && !item.subItems && (
              <Link
                href={item.path}
                className={`menu-item ${isActive(item.path) ? "menu-item-active" : "menu-item-inactive"}`}
              >
                <span className={`${isActive(item.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                  {item.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{item.name}</span>}
              </Link>
            )}

            {item.subItems && (
              <>
                <button
                  onClick={() => setOpen(isOpen ? null : { index: i, type })}
                  className={`menu-item ${isOpen ? "menu-item-active" : "menu-item-inactive"}`}
                >
                  <span className={`${isOpen ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>{item.icon}</span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <>
                      <span className="menu-item-text">{item.name}</span>
                      <ChevronDownIcon className={`ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </>
                  )}
                </button>
                <div
                  ref={(el) => (submenuRefs.current[key] = el)}
                  className="overflow-hidden transition-all duration-300"
                  style={{ height: isOpen ? submenuHeight[key] : 0 }}
                >
                  <ul className="ml-10 mt-2 space-y-1">
                    {item.subItems.map((sub) => (
                      <li key={sub.path}>
                        <Link
                          href={sub.path}
                          className={`menu-dropdown-item ${isActive(sub.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}
                        >
                          <span className="menu-item-icon-inactive">{sub.icon}</span>
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 mt-16 lg:mt-0 left-0 h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-800 z-50 transition-all duration-300 ${
        isExpanded || isMobileOpen || isHovered ? "w-[290px]" : "w-[90px]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/" className="flex items-center">
          <div className="flex items-center gap-3">
            <Image src="/images/Logoinstansi/logotb.png" width={60} height={60} alt="Logo" />
            {(isExpanded || isHovered) && <h2 className="hidden lg:block text-2xl font-bold text-[#173E67]">TARUNA BHAKTI</h2>}
          </div>
        </Link>
      </div>

      <nav className="px-4 space-y-8 overflow-y-auto no-scrollbar">
        <div>
          <h2 className="menu-title">{isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}</h2>
          {renderMenu(filteredMain, "main")}
        </div>
        <div>
          <h2 className="menu-title">{isExpanded || isHovered || isMobileOpen ? "Lainnya" : <HorizontaLDots />}</h2>
          {renderMenu(filteredAnother, "another")}
        </div>
      </nav>
    </aside>
  );
}
