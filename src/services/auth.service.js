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
    AuthToken.removeToken();
  }

  getUserRole() {
    const token = AuthToken.getToken();
    let mRole = null;
    if (Boolean(token)) {
      const { role } = jwt_decode(token);
      if (role === "USER") {
        mRole = "customer";
      } else if (role === "ADMIN") {
        mRole = "admin";
      } else if (role === "GENERAL-SUPPORT") {
        mRole = "general-support";
      } else if (role === "ACCOUNTING") {
        mRole = "accounting";
      }
    }
    return mRole;
  }
}

export default new AuthService();
