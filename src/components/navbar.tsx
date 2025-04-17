import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, User, Settings, LogOut, UserPlus } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { MobileSidebar } from "./mobile-sidebar"
import { useAuth } from "../context/AuthContext"

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleAuthAction = () => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-[#4b0082] px-4 text-white md:px-6">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold italic">
          EmpMng
        </Link>
      </div>

      <div className="relative mx-4 hidden flex-1 max-w-md md:flex">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/70" />
        <Input
          type="search"
          placeholder="Search here"
          className="w-full rounded-full border-white/20 bg-white/10 pl-8 text-white placeholder:text-white/70 focus-visible:ring-white/30"
          onClick={handleAuthAction}
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-white" onClick={handleAuthAction}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                {isAuthenticated && user?.image_url ? (
                  <AvatarImage
                    src={user.image_url || "/placeholder.svg"}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                ) : (
                  <AvatarImage src="/placeholder.svg" alt="User" />
                )}
                <AvatarFallback>
                  {isAuthenticated && user ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}` : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {isAuthenticated ? (
              <>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/signup" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
