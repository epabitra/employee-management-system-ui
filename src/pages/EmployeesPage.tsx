
import { useState, useEffect } from "react"
import { Navbar } from "../components/navbar"
import { Sidebar } from "../components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { PlusCircle, Grid, List } from "lucide-react"
import { EmployeeTable } from "../components/employee-table"
import { AddEmployeeDialog } from "../components/add-employee-dialog"
import { TeamsList } from "../components/teams-list"
import { AddTeamDialog } from "../components/add-team-dialog"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { fetchTeams } from "../services/team-service"

export default function EmployeesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false)
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false)
  const [employees, setEmployees] = useState<any[]>(() => {
    const storedEmployees = localStorage.getItem("employees")
    return storedEmployees ? JSON.parse(storedEmployees) : []
  })
  const [teams, setTeams] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Fetch teams on component mount
  useEffect(() => {
    const loadTeams = async () => {
      setIsLoading(true)
      try {
        // For demo purposes, we'll use mock data if API call fails
        const fetchedTeams = await fetchTeams().catch((error) => {
          console.log("Using mock teams data", error.message)
          return [
            { id: 1, name: "PHP", members: [] },
            { id: 2, name: "Designing", members: [] },
            { id: 3, name: "IOS", members: [] },
            { id: 4, name: "Android", members: [] },
            { id: 5, name: "Java", members: [] },
            { id: 6, name: "Python", members: [] },
          ]
        })
        setTeams(fetchedTeams)
      } catch (error) {
        console.error("Error fetching teams:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTeams()
  }, [])

  const handleTabChange = (value: string) => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    setActiveTab(value)
  }

  const handleAddPerson = () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    setIsEmployeeDialogOpen(true)
  }

  const handleAddTeam = () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    setIsTeamDialogOpen(true)
  }

  const handleAddEmployee = (employee: any) => {
    const newEmployees = [...employees, employee]
    setEmployees(newEmployees)
    localStorage.setItem("employees", JSON.stringify(newEmployees))
    setIsEmployeeDialogOpen(false)
  }

  const handleAddNewTeam = (team: any) => {
    // In a real app, this would be handled by the API
    const newTeam = {
      id: Date.now(), // Use a proper ID from the API response in production
      name: team.name,
      members: [],
    }

    const updatedTeams = [...teams, newTeam]
    setTeams(updatedTeams)
    setIsTeamDialogOpen(false)
  }

  const handleEditTeam = (id: number, newName: string) => {
    const updatedTeams = teams.map((team) => (team.id === id ? { ...team, name: newName } : team))
    setTeams(updatedTeams)
  }

  const handleDeleteTeam = (id: number) => {
    const updatedTeams = teams.filter((team) => team.id !== id)
    setTeams(updatedTeams)
  }

  const handleAddTeamMember = (teamId: number, memberId: string) => {
    const employee = employees.find((emp) => emp.id === memberId)
    if (!employee) return

    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        // Check if member already exists in team
        if (!team.members.some((m: any) => m.id === memberId)) {
          return {
            ...team,
            members: [
              ...team.members,
              {
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                avatar: employee.avatar,
              },
            ],
          }
        }
      }
      return team
    })

    setTeams(updatedTeams)
  }

  const handleViewModeChange = (mode: "grid" | "list") => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    setViewMode(mode)
  }

  const handleStatusChange = (id: string, status: string) => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    const updatedEmployees = employees.map((emp) => (emp.id === id ? { ...emp, status } : emp))
    setEmployees(updatedEmployees)
    localStorage.setItem("employees", JSON.stringify(updatedEmployees))
  }

  const filteredEmployees = activeTab === "all" ? employees : employees.filter((emp) => emp.team === activeTab)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col pt-16 md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:ml-64 md:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Employees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tab Navigation */}
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full max-w-xs grid-cols-2">
                  <TabsTrigger value="all" className={activeTab === "all" ? "bg-amber-500 text-white" : ""}>
                    All
                  </TabsTrigger>
                  <TabsTrigger value="teams" className={activeTab === "teams" ? "bg-amber-500 text-white" : ""}>
                    Teams
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {activeTab === "all" ? (
                <>
                  {/* People Count and Add Button */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                    <h2 className="text-2xl font-semibold">{filteredEmployees.length} People</h2>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <div className="flex border rounded-md overflow-hidden">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`${viewMode === "grid" ? "bg-purple-900 text-white" : ""}`}
                          onClick={() => handleViewModeChange("grid")}
                        >
                          <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`${viewMode === "list" ? "bg-purple-900 text-white" : ""}`}
                          onClick={() => handleViewModeChange("list")}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button onClick={handleAddPerson} className="bg-purple-900 hover:bg-purple-800 w-full sm:w-auto">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Person
                      </Button>
                    </div>
                  </div>

                  {/* Employee Table */}
                  <EmployeeTable
                    employees={filteredEmployees}
                    viewMode={viewMode}
                    onStatusChange={handleStatusChange}
                  />
                </>
              ) : (
                <>
                  {/* Teams View */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                    <h2 className="text-2xl font-semibold">{teams.length} Teams</h2>
                    <Button onClick={handleAddTeam} className="bg-purple-900 hover:bg-purple-800 w-full sm:w-auto">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Team
                    </Button>
                  </div>

                  {/* Teams List */}
                  <TeamsList
                    teams={teams}
                    employees={employees}
                    onEditTeam={handleEditTeam}
                    onDeleteTeam={handleDeleteTeam}
                    onAddMember={handleAddTeamMember}
                    isLoading={isLoading}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add Employee Dialog */}
      <AddEmployeeDialog
        open={isEmployeeDialogOpen}
        onOpenChange={setIsEmployeeDialogOpen}
        onAddEmployee={handleAddEmployee}
        availableTeams={teams}
      />

      {/* Add Team Dialog */}
      <AddTeamDialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen} onAddTeam={handleAddNewTeam} />
    </div>
  )
}
