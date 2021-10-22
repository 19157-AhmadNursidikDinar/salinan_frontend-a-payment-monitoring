import axios from "axios";
import authHeader from "../utils/auth-header";
import AuthService from "./auth.service";
AuthService.setupInterceptor();

const apiUrl = process.env.REACT_APP_API_BASEURL + "/api/v1/user";

class UserService {
  async CreateNewUser(data) {
    const { fullname, username, password, role_id, branch_id } = data;
    // console.log(data);
    try {
      const response = await axios.post(
        apiUrl + "/create",
        {
          fullname,
          username,
          password,
          role_id,
          branch_id,
        },
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      return { error };
    }
  }

  async getAllUser(page = 1) {
    try {
      const response = await axios.get(apiUrl + `?page=${page}&size=10`, {
        headers: authHeader(),
      });
      if (response.data && response.data.data.length > 0) {
        return response.data;
      }
    } catch (error) {
      return { error };
    }
  }

  async UpdateUser(data) {
    const { fullname, username, id, role_id, branch_id } = data;
    // console.log(data);
    try {
      const response = await axios.put(
        apiUrl + "/update",
        {
          fullname,
          username,
          role_id,
          id,
          branch_id,
        },
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      return { error };
    }
  }

  async DeleteUser(id) {
    // console.log(data);
    try {
      const response = await axios.post(
        apiUrl + "/delete",
        {
          id,
        },
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      return { error };
    }
  }

  async getUserDetail(id) {
    try {
      const response = await axios.get(apiUrl + `/${id}`, {
        headers: authHeader(),
      });
      if (Boolean(response.data)) {
        return response.data;
      }
    } catch (error) {
      return { error };
    }
  }
}

export default new UserService();
