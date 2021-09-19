import axios from "axios";
import jwt_decode from "jwt-decode";
import AuthToken from "../utils/auth-token";

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
        const token = response.data.data.token;
        const { exp } = jwt_decode(token);
        AuthToken.setToken(token, exp, rememberMe);
        return response.data;
      }
    } catch (error) {
      // console.error(error);
      return { error };
    }
  }

  logout() {
    const sessionToken = localStorage.getItem("token");
    if (sessionToken) {
      localStorage.removeItem("token");
    }
    const localStorageToken = window.sessionStorage.getItem("token");
    if (localStorageToken) {
      window.sessionStorage.removeItem("token");
    }
  }

  getUserRole() {
    const token = AuthToken.getToken();
    const decoded = jwt_decode(token);
    return decoded.role || null;
  }
}

export default new AuthService();
