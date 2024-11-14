import {
    Calendar,
    Car,
    Computer,
    FileBarChart2,
    FileQuestion, FolderOpen,
    Logs,
    Menu, RectangleEllipsis, SettingsIcon,
    User,
    UserRound,
    UsersRound
} from "lucide-react";


export const dataSlidebarRoutes = [

    {
        icon: RectangleEllipsis,
        label: "Menú",
        href: "/dashboard",
        section: "general"


    },
    {
        icon: Logs,
        label: "Logs",
        href: "/logs",
        section: "gestionar"
    },
    {
        icon: Computer,
        label: "Computadoras",
        href: "/computers",
        section: "gestionar"

    },
    {
        icon: User,
        label: "Usuarios",
        href: "/users",
        section: "gestionar"

    },
    {
        icon: UsersRound,
        label: "Grupos",
        href: "/groups",
        section: "gestionar"
    },
    {
        icon: FolderOpen,
        label: "Unidades organizativas",
        href: "/unidades-organizativas",
        section: "gestionar"
    }, {
        icon: SettingsIcon,
        label: "Configuración",
        href: "/settings",
        section: "soporte"
    },
    {
        icon: FileQuestion,
        label: "FAQ",
        href: "/faq",
        section: "soporte",
    },
    {
        icon: FileBarChart2,
        label: "Reportes",
        href: "/reports",
        section: "general"

    }


]