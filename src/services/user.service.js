import axios from "axios";
import authHeader from "../utils/auth-header";

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
}

export default new UserService();
