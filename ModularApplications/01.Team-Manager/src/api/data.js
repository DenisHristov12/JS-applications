import * as api from "./api.js";

const endpoints = {
  allTeams: "/data/teams",
  allTeamMembers: "/data/members",
  teamById: "/data/teams/",
  teamMembersByTeamById: (id) => `/data/members?where=${encodeURIComponent(`teamId="${id}"`)}&load=user%3D_ownerId%3Ausers`,
//   updateFurniture: "/data/catalog/",
//   deleteFurniture: "/data/catalog/",
//   createFurniture: "/data/catalog",
};

export async function getAllTeams() {
  return api.get(endpoints.allTeams);
}

export async function getAllTeamMembers() {
  return api.get(endpoints.allTeamMembers);
}

export async function getTeamById(id) {
  return api.get(endpoints.teamById + id);
}

export async function getTeamMemberByTeamId(id) {
  return api.get(endpoints.teamMembersByTeamById(id));
}

// export async function updateFurniture(id, data) {
//   return api.put(endpoints.updateFurniture + id, data);
// }

// export async function deleteFurniture(id) {
//   return api.del(endpoints.deleteFurniture + id);
// }

// export async function createFurniture(data) {
//   return api.post(endpoints.createFurniture, data);
// }