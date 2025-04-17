import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

interface TeamMemberProps {
  name: string
  role: string
  avatar?: string
  initials: string
}

function TeamMember({ name, role, avatar, initials }: TeamMemberProps) {
  return (
    <div className="flex items-center gap-4 border-b py-4 last:border-0">
      <Avatar className="h-10 w-10">
        {avatar && <AvatarImage src={avatar} alt={name} />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  )
}

export function TeamLeads() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Team Leads</CardTitle>
        <Button variant="ghost" className="text-purple-700 hover:text-purple-900">
          Manage Team
        </Button>
      </CardHeader>
      <CardContent>
        <TeamMember 
          name="Pabitra" 
          role="PHP" 
          avatar="/placeholder.svg" 
          initials="EP" 
        />
        <TeamMember 
          name="Kishan" 
          role="Design" 
          avatar="/placeholder.svg" 
          initials="KP" 
        />
        <TeamMember 
          name="Chinmaya" 
          role="IOS" 
          avatar="/placeholder.svg" 
          initials="CP" 
        />
        <TeamMember 
          name="Abhishek" 
          role="Android" 
          avatar="/placeholder.svg" 
          initials="DA" 
        />
        <TeamMember 
          name="Someone" 
          role="Business" 
          avatar="/placeholder.svg" 
          initials="SO" 
        />
      </CardContent>
    </Card>
  );
}