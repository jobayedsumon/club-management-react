import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL ?? "http://127.0.0.1:8080/api/";

const fetchWrapper = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "x-access-token": authHeader(),
  },
});

fetchWrapper.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    //Return any error which is not due to authentication back to the calling service
    if (error?.response?.status !== 401) {
      return new Promise((resolve, reject) => {
        if (error && error?.response?.data) {
          reject(error.response.data);
        }
        reject({ error: "Something wrong try with valid data" });
      });
    }

    //resource not found
    if (error?.response && error?.response?.status == 404) {
      return Promise.reject({ error: "Not Found" });
    }

    return new Promise((resolve, reject) => {
      reject(error.response.data);
    });
  }
);

// Auth Helper functions
function authHeader() {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else {
    return false;
  }
}

export default fetchWrapper;
