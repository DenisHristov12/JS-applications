import * as api from "../api/api.js";

const endpoints = {
    allMotorcycles: "/data/motorcycles?sortBy=_createdOn%20desc",
    motorcycleById: "/data/motorcycles/",
    createMC: "/data/motorcycles/",
};


export const getAllMotorcycles = () => {
    return api.get(endpoints.allMotorcycles);
}

export const getMCById = (id) => {
    return api.get(endpoints.motorcycleById + id);
}

export const updateMC = (id, data) => {
    return api.put(endpoints.motorcycleById + id, data);
}

export const deleteMC = (id) => {
    return api.del(endpoints.motorcycleById + id);
}

export const createMC = (data) => {
    return api.post(endpoints.createMC, data);
}