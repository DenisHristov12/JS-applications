import * as api from './api.js';

export async function getAllAlbums() {
    return api.get('/data/albums?sortBy=_createdOn%20desc');
}

export async function getAlbumById(id) {
    return api.get('/data/albums/' + id);
}

export async function createAlbum(data) {
    return api.post('/data/albums', data);
}

export async function updateAlbumById(id, data) {
    return api.put('/data/albums/' + id, data);
}

export async function deleteAlbumById(id) {
    return api.del('/data/albums/' + id);
}

export async function likeAlbumById(data) {
    return api.post('/data/likes', data);
}

export async function likesByAlbumId(albumId) {
    return api.get(`/data/likes?where=${encodeURIComponent(`albumId="${albumId}"`)}&distinct=_ownerId&count`);
}

export async function getAllLikesByAlbumIdAndUserId(albumId, userId) {
    return api.get(`/data/likes?where=${encodeURIComponent(`albumId="${albumId}"`)}%20and%20${encodeURIComponent(`_ownerId="${userId}"`)}&count`);
}