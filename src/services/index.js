import axios from "axios";
let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "https://ironlogger.herokuapp.com")
  : (baseURL = "http://localhost:3000");

const service = axios.create({ withCredentials: true, baseURL });

const MY_SERVICE = {
  test: async () => {
    return await service.get("/");
  },
  signup: async (user) => {
    return await service.post("/signup", user);
  },
  login: async (user) => {
    return await service.post("/login", user);
  },
  logOut: async () => {
    return await service.get("/logout");
  },
  getProfile: async () => {
    return await service.get("/profile");
  },
  getUserInfo: async () => {
    return await service.get("/info");
  },
  getAllEmployers: async () => {
    return await service.get("/employers");
  },
  requestEmployer: async (employerId) => {
    return await service.get(`/requestEmployer/${employerId}`);
  },
  getPois: async () => {
    return await service.get(`/pois`);
  },
  getPoi: async (poiId) => {
    return await service.get(`/pois/${poiId}`);
  },
  updatePoi: async (poiId, poi) => {
    return await service.put(`/pois/${poiId}`, poi);
  },
  createPoi: async (poi) => {
    return await service.post(`/pois`, poi);
  },
  updateUser: async (user, values) => {
    return await service.put(`/users/${user}`, values);
  },
  createLog: async (url, values) => {
    return await service.post(url, values);
  },
  deletePoi: async (poi) => {
    return await service.delete(`/pois/${poi}`);
  },
};

export default MY_SERVICE;
