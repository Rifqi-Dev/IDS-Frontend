import axios from "axios";

export const API_URL = "https://idsapi.kapuyuaxdev.my.id";

export const Login = async (payload) => {
  return axios.post(API_URL + "/auth/login", payload);
};

export const Register = async (payload) => {
  return axios.post(API_URL + "/auth/register", payload);
};

export const AccessMenus = async () => {
  return axios.get(API_URL + "/user/access_menu", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const GetProfile = async () => {
  return axios.get(API_URL + "/user/profile", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const EditProfile = async (payload) => {
  return axios.put(API_URL + "/user/profile", payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetRole = async (page, pageSize, keyword) => {
  return axios.get(API_URL + "/role/", {
    params: { page: page, pageSize: pageSize, keyword: keyword },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetAccessList = async (keyword) => {
  return axios.get(API_URL + "/rbac/", {
    params: { keyword: keyword },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const CreateRole = async (payload) => {
  return axios.post(API_URL + "/role", payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const UpdateRole = async (payload) => {
  return axios.put(API_URL + "/role", payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const DeleteRole = async (id) => {
  return axios.delete(API_URL + "/role", {
    params: { id: id },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const Getlocation = async (page, pageSize, keyword) => {
  return axios.get(API_URL + "/location/", {
    params: { page: page, pageSize: pageSize, keyword: keyword },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const Createlocation = async (payload) => {
  return axios.post(API_URL + "/location", payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const Updatelocation = async (payload) => {
  return axios.put(API_URL + "/location", payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const Deletelocation = async (id) => {
  return axios.delete(API_URL + "/location", {
    params: { id: id },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
