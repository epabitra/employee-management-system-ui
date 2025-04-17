import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { RefreshCw, Cake, Bed, Gift, Briefcase, Home } from 'lucide-react'
import { Button } from "./ui/button"

interface EventItemProps {
  icon: React.ReactNode
  text: string
  avatar?: string
  initials?: string
}

function EventItem({ icon, text, avatar, initials }: EventItemProps) {
  return (
    <div className="flex items-center justify-between border-b py-4 last:border-0">
      <div className="flex items-center gap-3">
        <div className="text-gray-500">
          {icon}
        </div>
        <span>{text}</span>
      </div>
      {(avatar || initials) && (
        <Avatar>
          {avatar && <AvatarImage src={avatar} alt="User" />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

export function TodayEvents() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Today</CardTitle>
        <Button variant="ghost" size="icon">
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent>
        <EventItem 
          icon={<Cake className="h-5 w-5" />} 
          text="No Birthdays Today" 
        />
        <EventItem 
          icon={<Bed className="h-5 w-5" />} 
          text="Chinmaya is off sick today" 
          avatar="/placeholder.svg"
          initials="CK"
        />
        <EventItem 
          icon={<Gift className="h-5 w-5" />} 
          text="Kishan is parenting leave today" 
          avatar="/placeholder.svg"
          initials="KP"
        />
        <EventItem 
          icon={<Briefcase className="h-5 w-5" />} 
          text="Abhishek is away today" 
          avatar="/placeholder.svg"
          initials="DA"
        />
        <EventItem 
          icon={<Home className="h-5 w-5" />} 
          text="Pabitra is working from home today" 
          avatar="/placeholder.svg"
          initials="EP"
        />
      </CardContent>
    </Card>
  )
}