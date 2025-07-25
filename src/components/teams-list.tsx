import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AddTeamMemberDialog } from "./add-team-member-dialog";
import { EditTeamDialog } from "./edit-team-dialgo";


export interface Team {
  id: number
  uuid: string
  teamName: string
  description: string
  members: any[]
}


export interface TeamMember {
  uuid: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface TeamsListProps {
  teams: any[];
  onEditTeam: (uuid: string, teamName: string, description: string) => Promise<void>;
  onDeleteTeam: (uuid: string) => Promise<void>;
  // onAddMember: (teamId: number, userId: string) => Promise<void>;
  isLoading: boolean;
}

export function TeamsList({
  teams,
  onEditTeam,
  onDeleteTeam,
  // onAddMember,
  isLoading,
}: TeamsListProps) {

  const [editingTeam, setEditingTeam] = useState<Team | null>(null)
  const [addingMembersToTeam, setAddingMembersToTeam] = useState<Team | null>(null)


  if (isLoading) {
    <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900"></div>
    </div>
  }

  if (!Array.isArray(teams) || teams.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        No teams found. Please add a new team.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {(teams.map((team) => (
          <Card key={team.id} className="p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">{team.teamName}</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-purple-900 text-white hover:bg-purple-800"
                  onClick={() => setEditingTeam(team)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-purple-900 text-white hover:bg-purple-800"
                  onClick={() => onDeleteTeam(team.uuid)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{team.description}</p>

            {/* Team Members */}
            <div className="flex flex-wrap gap-2 mb-4">
                {team.length > 0 ? (
                team.members.map((member: TeamMember) => (
                  <Avatar key={member.uuid} className="h-10 w-10">
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

            <Button className="w-full bg-purple-900 hover:bg-purple-800" onClick={() => setAddingMembersToTeam(team)}>
              <Plus className="mr-2 h-4 w-4" /> Add Members
            </Button>
          </Card>
        )))}
      </div>

      {/* Edit Team Dialog */}
      {editingTeam && (
        <EditTeamDialog
          teamName={editingTeam}
          open={!!editingTeam}
          onOpenChange={(open) => !open && setEditingTeam(null)}
          onSave={(teamName, description) => {
            onEditTeam(editingTeam.uuid, teamName, description)
            setEditingTeam(null)
          }}
        />
      )}

      {/* Add Team Member Dialog */}
      {/* {addingMembersToTeam && (
        <AddTeamMemberDialog
          team={addingMembersToTeam}
          open={!!addingMembersToTeam}
          onOpenChange={(open) => !open && setAddingMembersToTeam(null)}
          // You need to provide the employees prop here, e.g. employees={employees}
          onAddMember={(memberId) => {
            onAddMember(addingMembersToTeam.id, memberId)
            setAddingMembersToTeam(null)
          }}
        />
      )} */}
    </div>
  );
}
