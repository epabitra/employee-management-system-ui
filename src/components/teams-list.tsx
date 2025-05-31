
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useState } from "react"
import { EditTeamDialog } from "./edit-team-dialgo"
import { AddTeamMemberDialog } from "./add-team-member-dialog"

interface Team {
  id: number
  name: string
  members: any[]
}

interface TeamsListProps {
  teams: Team[]
  employees: any[]
  onEditTeam: (id: number, name: string) => void
  onDeleteTeam: (id: number) => void
  onAddMember: (teamId: number, memberId: string) => void
  isLoading: boolean
}

export function TeamsList({ teams, employees, onEditTeam, onDeleteTeam, onAddMember, isLoading }: TeamsListProps) {
  const [editingTeam, setEditingTeam] = useState<Team | null>(null)
  const [addingMembersToTeam, setAddingMembersToTeam] = useState<Team | null>(null)

  const handleEditClick = (team: Team) => {
    setEditingTeam(team)
  }

  const handleDeleteClick = (teamId: number) => {
    if (confirm("Are you sure you want to delete this team?")) {
      onDeleteTeam(teamId)
    }
  }

  const handleAddMembersClick = (team: Team) => {
    setAddingMembersToTeam(team)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900"></div>
      </div>
    )
  }

  if (teams.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No teams found.</p>
        <p className="text-gray-500">Add your first team to get started.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">{team.name}</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-purple-900 text-white hover:bg-purple-800"
                  onClick={() => handleEditClick(team)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-purple-900 text-white hover:bg-purple-800"
                  onClick={() => handleDeleteClick(team.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Team Members */}
            <div className="flex flex-wrap gap-2 mb-4">
              {team.members.length > 0 ? (
                team.members.map((member) => (
                  <Avatar key={member.id} className="h-10 w-10">
                    <AvatarImage
                      src={member.avatar || "/placeholder.svg"}
                      alt={`${member.firstName} ${member.lastName}`}
                    />
                    <AvatarFallback>
                      {member.firstName?.charAt(0)}
                      {member.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No members yet</p>
              )}
            </div>

            <Button className="w-full bg-purple-900 hover:bg-purple-800" onClick={() => handleAddMembersClick(team)}>
              <Plus className="mr-2 h-4 w-4" /> Add Members
            </Button>
          </Card>
        ))}
      </div>

      {/* Edit Team Dialog */}
      {editingTeam && (
        <EditTeamDialog
          team={editingTeam}
          open={!!editingTeam}
          onOpenChange={(open) => !open && setEditingTeam(null)}
          onSave={(name) => {
            onEditTeam(editingTeam.id, name)
            setEditingTeam(null)
          }}
        />
      )}

      {/* Add Team Member Dialog */}
      {addingMembersToTeam && (
        <AddTeamMemberDialog
          team={addingMembersToTeam}
          open={!!addingMembersToTeam}
          onOpenChange={(open) => !open && setAddingMembersToTeam(null)}
          employees={employees.filter((emp) => !addingMembersToTeam.members.some((member) => member.id === emp.id))}
          onAddMember={(memberId) => {
            onAddMember(addingMembersToTeam.id, memberId)
            setAddingMembersToTeam(null)
          }}
        />
      )}
    </div>
  )
}
