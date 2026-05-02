"use client";
import {
    Calendar1Icon,
    EllipsisVertical,
    InfoIcon,
    LayoutDashboardIcon,
    LogOut,
    UserIcon,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";
import { useHandleLogout } from "@/shared/hooks/useHandleLogout";
import { sessionService } from "@/entities/session/model/sessionService";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useMe } from "@/entities/user/model/api/useMe";

const items = [
    {
        title: "Accommodations",
        url: "/manager/accommodations",
        icon: LayoutDashboardIcon,
    },
    {
        title: "Requests",
        url: "/manager/requests",
        icon: InfoIcon,
    },
    {
        title: "Reservations",
        url: "/manager/reservations",
        icon: Calendar1Icon,
    },
];

export function ManagerSidebar() {
    const { handleLogout } = useHandleLogout();
    const { data } = useMe();

    const [isManager, setIsManager] = useState(false);
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null;
    const user = sessionService.getUserFromToken(token ?? "");

    useEffect(() => {
        setIsManager(true);
    }, []);

    return isManager ? (
        <Sidebar>
            <SidebarHeader className={"p-4"}>
                <figure className={"flex items-center gap-2 justify-between"}>
                    <Avatar className={"w-10 h-10"}>
                        <AvatarImage
                            className={"object-cover"}
                            src={data?.photoUrl}
                            alt=""
                        />
                        <AvatarFallback>
                            {data?.firstName[0]}
                            {data?.lastName[0]}
                        </AvatarFallback>
                    </Avatar>
                    <figcaption className={"flex flex-col w-full gap-0"}>
                        <p className={"w-full"}>
                            {data?.firstName} {data?.lastName}
                        </p>
                        <p className={"text-muted-foreground text-xs dark:text-muted-foreground"}>
                            {user?.email}
                        </p>
                    </figcaption>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size={"sm"}>
                                <EllipsisVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <Link href="/manager/profile">
                                    <DropdownMenuItem>
                                        <UserIcon />
                                        Profile
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                    onClick={() => handleLogout()}
                                >
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </figure>
            </SidebarHeader>
            <SidebarContent className={"p-4"}>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.url}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    ) : null;
}
