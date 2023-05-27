import axios from "axios";


let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
headers.append("Access-Control-Allow-Credentials", "true");

export const login = async (userCredentials) => {

    const request = await axios.post(`http://localhost:8000/api/auth/login`,userCredentials);
    const response = await request.data;

    return response;
};
