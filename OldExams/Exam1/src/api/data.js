import * as api from "../api/api.js";

const endpoints = {
    allFacts: "/data/facts?sortBy=_createdOn%20desc",
    factById: "/data/facts/",
    createFact: "/data/facts",
};

export async function getAllFacts(){
   return api.get(endpoints.allFacts);
}


export async function getFactById(id){
   return api.get(`${endpoints.factById}${id}`);
}

export async function editFactById(id, data){
    return api.put(endpoints.factById + id, data);
}

export async function deleteFactById(id){
    return api.del(endpoints.factById + id);
}

export async function createFact(data){
    return api.post(endpoints.createFact, data);
}
