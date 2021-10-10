import axios from "axios";
import authHeader from "../utils/auth-header";
import AuthService from "./auth.service";
AuthService.setupInterceptor();

const apiUrl = process.env.REACT_APP_API_BASEURL;

class HealthCheckService {
  async plainHealthCheck() {
    try {
      const response = await axios.get(apiUrl + "/health");
      //   console.log(response);
      return response;
    } catch (error) {
      //   console.error(error);
      return { error };
    }
  }

  async JWTHealthCheck() {
    try {
      const response = await axios.get(apiUrl + "/health/jwt", {
        headers: authHeader(),
      });
      //   console.log(response);
      return response;
    } catch (error) {
      //   console.error(error);
      return { error };
    }
  }
}

export default new HealthCheckService();
