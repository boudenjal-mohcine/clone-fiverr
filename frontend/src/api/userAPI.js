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

export const register = async (userCredentials) => {
    const formData = new FormData();
  
    // Append form fields to the formData object
    formData.append('username', userCredentials.username);
    formData.append('email', userCredentials.email);
    formData.append('password', userCredentials.password);
    formData.append('image', userCredentials?.image);
    formData.append('country', userCredentials.country);

    try {
      const response = await axios.post('http://localhost:8000/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error(error);
      throw error;
    }
  };
  



