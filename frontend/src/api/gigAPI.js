import { api } from "../config/config"

let headers = new Headers();
headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  headers.append('Access-Control-Allow-Credentials', 'true');

  
export const getGigs = 
  async  () => {
      const response = await api.request({
        url: `/gig`,
        method: "GET",
        headers
      })
        return response.data.data
}