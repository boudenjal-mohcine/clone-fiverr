import { api } from "../config/config";

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
headers.append("Access-Control-Allow-Credentials", "true");

export const getCategories = async () => {
  const response = await api.request({
    url: `/category`,
    method: "GET",
    headers,
  });
  return response.data.data;
};
