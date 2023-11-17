import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BASE_API;

axios.defaults.timeout = 60000;
const axiosInstance = axios.create({
  baseURL,
  headers: {
    // "Content-Type": "application/json",
  },
});

// 请求拦截
axiosInstance.interceptors.request.use(
  (config) => {
    // const { user } = store.state
    // 设置请求头token，加密操作
    // const token = localStorage.getItem("token")
    // if (token) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`,
    //   }
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
axiosInstance.interceptors.response.use(
  (response) => {
    // 设置token以及定义请求的token参数，本地化存储
    // if (response.headers.authorization) {
    //   localStorage.setItem("app_token", response.headers.authorization);
    // } else {
    //   if (response.data && response.data.token) {
    //     localStorage.setItem("app_token", response.data.token);
    //   }
    // }

    return response.data;
  },
  (error) => {
    const { response } = error;
    console.log(error)

    return Promise.reject(response?.data);
  }
);

export default (config) => {
  return new Promise((resolve, reject) => {
    axiosInstance(config)
      .then((res) => {
        // console.log(res);
        resolve(res);
      })
      .catch((err) => {
        console.log("ERR" + err);
        reject(err);
      });
  });
};
