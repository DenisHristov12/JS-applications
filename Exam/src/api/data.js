import * as api from './api.js';

const endpoints = {
  allCars: '/data/cars?sortBy=_createdOn%20desc',
  carById: '/data/cars/',
  createCar: '/data/cars',
};

export async function getAllCars() {
  return api.get(endpoints.allCars);
}

export async function getCarById(id) {
  return api.get(`${endpoints.carById}${id}`);
}

export async function editCarById(id, data) {
  return api.put(endpoints.carById + id, data);
}

export async function deleteCarById(id) {
  return api.del(endpoints.carById + id);
}

export async function createCar(data) {
  return api.post(endpoints.createCar, data);
}
