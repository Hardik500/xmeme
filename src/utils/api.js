// api.js

// This file contains the API calls that are used in the frontend to interact with the backend

import axios from "axios";

export const fetchAllMemes = async (skip = 0, limit = 100) => {
    const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/memes?full=true&skip=${skip}&limit=${limit}`);
    return result.data;
}

export const fetchAMeme = async (id) => {
    const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/memes/${id}?full=true`);
    return result.data;
}

export const postMeme = async (inputData) => {
    const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/memes`, inputData);
    return result.data;
}

export const patchMeme = async (id, inputData) => {
    await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/memes/${id}`, {url: inputData.url, caption: inputData.caption});
}