import axios from "axios"

// Create an axios instance with default config
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Function to fetch all teams
export async function fetchTeams() {
  try {
    const response = await api.get("/teams")
    return response.data
  } catch (error) {
    console.error("Error fetching teams:", error)
    throw error
  }
}

// Function to create a new team
export async function createTeam(teamData: { name: string }) {
  try {
    const response = await api.post("/teams", teamData)
    return response.data
  } catch (error) {
    console.error("Error creating team:", error)
    throw error
  }
}

// Function to update a team
export async function updateTeam(id: number, teamData: { name: string }) {
  try {
    const response = await api.put(`/teams/${id}`, teamData)
    return response.data
  } catch (error) {
    console.error("Error updating team:", error)
    throw error
  }
}

// Function to delete a team
export async function deleteTeam(id: number) {
  try {
    await api.delete(`/teams/${id}`)
    return true
  } catch (error) {
    console.error("Error deleting team:", error)
    throw error
  }
}

// Function to add a member to a team
export async function addTeamMember(teamId: number, userId: string) {
  try {
    const response = await api.post(`/teams/${teamId}/members`, { userId })
    return response.data
  } catch (error) {
    console.error("Error adding team member:", error)
    throw error
  }
}

// Function to remove a member from a team
export async function removeTeamMember(teamId: number, userId: string) {
  try {
    await api.delete(`/teams/${teamId}/members/${userId}`)
    return true
  } catch (error) {
    console.error("Error removing team member:", error)
    throw error
  }
}
