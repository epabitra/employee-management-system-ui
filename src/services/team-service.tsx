import axios from "axios";
import { TEAM_LIST, CREATE_TEAM, EDIT_TEAM, DELETE_TEAM } from "../constants/constants";

export const getTeams = async () => {
  try {
    const res = await axios.get(TEAM_LIST);
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    throw new Error("Failed to fetch teams");
  }
};

export const createTeam = async (team: { teamName: string; description: string }) => {
  try {
    const res = await axios.post(CREATE_TEAM, team, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to create team");
  }
};

export const editTeam = async (uuid: string, teamName: string, description: string) => {
  try {
    const res = await axios.put(`${EDIT_TEAM}/${uuid}`, { teamName, description }, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to edit team");
  }
};


export const deleteTeam = async (uuid: string) => {
  try {
    await axios.delete(`${DELETE_TEAM}/${uuid}`);
  } catch (error) {
    throw new Error("Failed to delete team");
  }
};
