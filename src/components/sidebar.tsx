
import type React from "react"

import { useNavigate, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import { Card } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Home, Users, Building2, Calendar, FileText, Star } from "lucide-react"
import { useAuth } from "../context/useAuth"

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  isActive?: boolean
}

function NavItem({ href, icon: Icon, label, isActive }: NavItemProps) {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (!isLoggedIn) {
      navigate("/login")
      return
    }

    navigate(href)
  }

  return (
    <a
      href={href}
      className={cn(
        "flex flex-col items-center justify-center p-3 text-sm transition-colors",
        isActive ? "bg-amber-500 text-white" : "text-gray-700 hover:bg-gray-100",
      )}
      onClick={handleClick}
    >
      <Icon className="mb-1 h-5 w-5" />
      <span>{label}</span>
    </a>
  )
}

export function Sidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(currentDate)

  const { user, isLoggedIn } = useAuth()

  // Determine current page name based on pathname
  const getCurrentPageName = () => {
    if (pathname === "/" || pathname === "/dashboard") return "Dashboard"
    if (pathname === "/employees") return "Employees"
    if (pathname === "/company") return "Company"
    if (pathname === "/calendar") return "Calendar"
    if (pathname === "/leave") return "Leave"
    if (pathname === "/reviews") return "Reviews"
    if (pathname === "/settings") return "Settings"
    if (pathname === "/profile") return "Profile"
    return "Dashboard" // Default
  }

  return (
    <aside className="absolute top-16 left-0 h-[calc(100vh-2rem)] w-64 border-r bg-background md:block hidden z-10">
      <div className="flex flex-col gap-4 p-4 overflow-y-auto h-full">
        {/* Current Page Card */}
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">/ {getCurrentPageName()}</span>
          </div>
          <h2 className="mt-1 text-xl font-semibold">{getCurrentPageName()}</h2>
        </Card>

        {/* Admin Profile Card */}
        <Card className="p-4 text-center">
          <Avatar className="mx-auto h-20 w-20">
            {isLoggedIn() && user?.imageUrl ? (
              <AvatarImage src={user.imageUrl || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
            ) : (
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
            )}
            <AvatarFallback>
              {isLoggedIn() && user?.firstName && user?.lastName
                ? `${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`
                : "U"}
            </AvatarFallback>
          </Avatar>
          <h3 className="mt-2 text-lg font-medium">
            {isLoggedIn() && user?.firstName
              ? `Welcome ${user.firstName}`
              : "Welcome Guest"}
          </h3>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </Card>

        {/* Navigation Menu */}
        <Card className="overflow-hidden p-0">
          <div className="grid grid-cols-2">
            <NavItem href="/" icon={Home} label="Dashboard" isActive={pathname === "/" || pathname === "/dashboard"} />
            <NavItem href="/employees" icon={Users} label="Employees" isActive={pathname === "/employees"} />
            <NavItem href="/company" icon={Building2} label="Company" isActive={pathname === "/company"} />
            <NavItem href="/calendar" icon={Calendar} label="Calendar" isActive={pathname === "/calendar"} />
            <NavItem href="/leave" icon={FileText} label="Leave" isActive={pathname === "/leave"} />
            <NavItem href="/reviews" icon={Star} label="Reviews" isActive={pathname === "/reviews"} />
          </div>
        </Card>
      </div>
    </aside>
  )
}
