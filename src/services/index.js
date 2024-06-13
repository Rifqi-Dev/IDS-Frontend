import axios from "axios";

export const API_URL = "https://idsapi.kapuyuaxdev.my.id";

export const Login = async (payload) => {
  return axios.post(API_URL + "/auth/login", payload);
};

export const Register = async (payload) => {
  return axios.post(API_URL + "/auth/register", payload);
};

export const AccessMenus = async () => {
  return axios.get(API_URL + "/rbac/access_menu", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const GetProfile = async () => {
  return axios.get(API_URL + "/user/profile", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
