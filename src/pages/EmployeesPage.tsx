import { useState, useEffect } from "react"
import { Navbar } from "../components/navbar"
import { Sidebar } from "../components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { PlusCircle } from "lucide-react"
import { useAuth } from "../context/useAuth"
import { useNavigate } from "react-router-dom"
import {
  getTeams,
  deleteTeam,
  editTeam,
  // addMemberToTeam,
} from "../services/team-service"
import { TeamsList } from "../components/teams-list"
import { AddTeamDialog } from "../components/add-team-dialog"

export default function EmployeesPage() {
  const [activeTab, setActiveTab] = useState("teams")
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false)
  const [teams, setTeams] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    loadTeams()
  }, [])

 const loadTeams = async () => {
  setIsLoading(true)
  try {
    const fetchedTeams = await getTeams()

    if (!Array.isArray(fetchedTeams)) {
      console.warn("Invalid data received from getTeams:", fetchedTeams)
    }

    setTeams(fetchedTeams ?? []) 
  } catch (error) {
    console.error("Error fetching teams:", error)
  } finally {
    setIsLoading(false)
  }
}


  const handleTabChange = (value: string) => {
    if (!isLoggedIn) return navigate("/login")
    setActiveTab(value)
  }

  const handleAddTeam = () => {
    if (!isLoggedIn) return navigate("/login")
    setIsTeamDialogOpen(true)
  }

   const handleDeleteTeam = async (uuid: string) => {
    try {
      await deleteTeam(uuid);
      await loadTeams();
    } catch (error) {
      console.error("Failed to delete team", error);
    }
  };

  const handleEditTeam = async (uuid: string, teamName: string, description: string) => {
  try {
    await editTeam(uuid, teamName, description);
    await loadTeams();
  } catch (error) {
    console.error("Failed to edit team", error);
  }
};


  // const handleaddMemberToTeam = async (teamId: number, userId: string) => {
  //   await addMemberToTeam(teamId, userId)
  //   console.log(`Add user ${userId} to team ${teamId}`);
  //   loadTeams()
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col pt-16 md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:ml-64 md:p-6">
          <Card>
            {/* <CardHeader>
              <CardTitle>Employees</CardTitle>
            </CardHeader> */}
            <CardContent className="space-y-6">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mt-4">
                <TabsList className="grid w-full max-w-xs grid-cols-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="teams">Teams</TabsTrigger>
                </TabsList>
              </Tabs>
              {activeTab === "teams" && (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                    <h2 className="text-2xl font-semibold">{teams.length} Teams</h2>
                    <Button onClick={handleAddTeam} className="bg-purple-900 hover:bg-purple-800 w-full sm:w-auto">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Team
                    </Button>
                  </div>
                  <TeamsList
                    teams={teams}
                    onEditTeam={handleEditTeam}
                    onDeleteTeam={handleDeleteTeam}
                    // onAddMember={handleaddMemberToTeam}
                    isLoading={isLoading}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
      <AddTeamDialog
        isOpen={isTeamDialogOpen}
        setIsOpen={setIsTeamDialogOpen}
        onTeamCreated={loadTeams}
      />
    </div>
  )
}
