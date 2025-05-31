
import type React from "react"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Home, Users, Building2, Calendar, FileText, Star, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useAuth } from "../context/AuthContext"

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  isActive?: boolean
  onClick?: () => void
}

function NavItem({ href, icon: Icon, label, isActive, onClick }: NavItemProps) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault()
      navigate("/login")
      if (onClick) onClick()
      return
    }

    if (onClick) onClick()
  }

  return (
    <Link
      to={href}
      className={cn(
        "flex flex-col items-center justify-center p-3 text-sm transition-colors",
        isActive ? "bg-amber-500 text-white" : "text-gray-700 hover:bg-gray-100",
      )}
      onClick={handleClick}
    >
      <Icon className="mb-1 h-5 w-5" />
      <span>{label}</span>
    </Link>
  )
}

export function MobileSidebar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(currentDate)

  const { user, isAuthenticated } = useAuth()

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
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85%] max-w-[300px] p-0">
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
              <Avatar className="mx-auto h-16 w-16 sm:h-20 sm:w-20">
                {isAuthenticated && user?.image_url ? (
                  <AvatarImage
                    src={user.image_url || "/placeholder.svg"}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                ) : (
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                )}
                <AvatarFallback>
                  {isAuthenticated && user ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}` : "U"}
                </AvatarFallback>
              </Avatar>
              <h3 className="mt-2 text-base sm:text-lg font-medium">
                {isAuthenticated && user ? `Welcome ${user.first_name}` : "Welcome Guest"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">{formattedDate}</p>
            </Card>

            {/* Navigation Menu */}
            <Card className="overflow-hidden p-0">
              <div className="grid grid-cols-2">
                <NavItem
                  href="/"
                  icon={Home}
                  label="Dashboard"
                  isActive={pathname === "/" || pathname === "/dashboard"}
                  onClick={() => setOpen(false)}
                />
                <NavItem
                  href="/employees"
                  icon={Users}
                  label="Employees"
                  isActive={pathname === "/employees"}
                  onClick={() => setOpen(false)}
                />
                <NavItem
                  href="/company"
                  icon={Building2}
                  label="Company"
                  isActive={pathname === "/company"}
                  onClick={() => setOpen(false)}
                />
                <NavItem
                  href="/calendar"
                  icon={Calendar}
                  label="Calendar"
                  isActive={pathname === "/calendar"}
                  onClick={() => setOpen(false)}
                />
                <NavItem
                  href="/leave"
                  icon={FileText}
                  label="Leave"
                  isActive={pathname === "/leave"}
                  onClick={() => setOpen(false)}
                />
                <NavItem
                  href="/reviews"
                  icon={Star}
                  label="Reviews"
                  isActive={pathname === "/reviews"}
                  onClick={() => setOpen(false)}
                />
              </div>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
