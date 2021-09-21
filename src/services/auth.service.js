import axios from "axios";
import jwt_decode from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_BASEURL + "/api/v1/user/";

class AuthService {
  async login({ username, password, rememberMe }) {
    try {
      const response = await axios.post(apiUrl + "login", {
        username,
        password,
      });
      // console.log(response);
      if (response.data && response.data.data.token) {
        // console.log(decoded);
        localStorage.setItem("token", response.data.data.token);
        return response.data;
      }
    } catch (error) {
      // console.error(error);
      return { error };
    }
  }

  logout() {
    localStorage.removeItem("token");
  }

  getUserRole() {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    return decoded.role || null;
  }
}

export default new AuthService();
