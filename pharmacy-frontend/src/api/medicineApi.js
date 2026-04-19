import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/medicines",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
export const createMedicine = (data) => API.post("/create", data);

// GET ALL
export const getMedicines = () => API.get("/");

// SEARCH
export const searchMedicine = (name) => API.get(`/search?name=${name}`);

// GET BY BATCH
export const getByBatch = (batchNo) => API.get(`/${batchNo}`);

// UPDATE
export const updateMedicine = (id, data) => API.put(`/${id}`, data);

// DELETE
export const deleteMedicine = (name, batchNo) =>
  API.delete(`/name/${name}/batch/${batchNo}`);

// EXPIRY
export const getExpired = () => API.get("/expired");
export const getExpiringSoon = () => API.get("/expiring-soon");
