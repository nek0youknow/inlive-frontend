"use client";

import { useState } from "react";
import { Container } from "@/shared/ui/container";
import {
    Calendar,
    FileText,
    Home,
    LogOut,
    Search,
    User,
    Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";
import { useHandleLogout } from "@/shared/hooks/useHandleLogout";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/shared/ui/sheet";

export function ClientHeader() {
    const { handleLogout } = useHandleLogout();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { href: "/client", label: "Home", icon: Home },
        { href: "/client/search", label: "Search", icon: Search },
        { href: "/client/requests", label: "My requests", icon: FileText },
        {
            href: "/client/reservations",
            label: "My reservations",
            icon: Calendar,
        },
    ];

    const handleNavClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className={"pt-4 md:pt-10 pb-3 md:pb-5 border-b border-border"}>
            <Container className={"flex justify-between items-center gap-3"}>
                <div className={"font-black text-2xl md:text-4xl shrink-0"}>
                    <Link href={"/client"}>UI Tap</Link>
                </div>

                <nav className="hidden md:flex flex-1 justify-end items-center gap-3">
                    <ul className="flex items-center gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`
                                            flex items-center gap-2 px-4 py-2 rounded-lg
                                            font-medium transition-all duration-200
                                            ${
                                                isActive
                                                    ? "bg-rose-900/50 text-rose-300"
                                                    : "text-muted-foreground hover:text-foreground"
                                            }
                                        `}
                                        aria-current={
                                            isActive ? "page" : undefined
                                        }
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"ghost"} size={"sm"}>
                                    <User />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link href="/client/users/me">
                                            <User />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleLogout()}
                                    >
                                        <LogOut />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </ul>
                </nav>

                <div className="flex items-center gap-2 md:hidden">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </Button>
                </div>
            </Container>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent side="right" className="w-[280px] sm:w-[300px]">
                    <SheetHeader>
                        <SheetTitle className="text-left">Menu</SheetTitle>
                    </SheetHeader>
                    <nav className="mt-8">
                        <ul className="flex flex-col gap-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={handleNavClick}
                                            className={`
                                                flex items-center gap-3 px-4 py-3 rounded-lg
                                                font-medium transition-all duration-200
                                                ${
                                                    isActive
                                                        ? "bg-rose-900/50 text-rose-300"
                                                        : "text-muted-foreground hover:bg-muted"
                                                }
                                            `}
                                            aria-current={
                                                isActive ? "page" : undefined
                                            }
                                        >
                                            <Icon className="w-5 h-5" />
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className="mt-4 pt-4 border-t border-border">
                                <Link
                                    href="/client/users/me"
                                    onClick={handleNavClick}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-muted-foreground hover:bg-muted"
                                >
                                    <User className="w-5 h-5" />
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        handleLogout();
                                        handleNavClick();
                                    }}
                                    className="w-full justify-start gap-3 px-4 py-3 text-muted-foreground hover:bg-muted"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Log out
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    );
}
