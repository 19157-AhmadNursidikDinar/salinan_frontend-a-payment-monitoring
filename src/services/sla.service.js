import axios from "axios";
import authHeader from "../utils/auth-header";
import AuthService from "./auth.service";
AuthService.setupInterceptor();

const apiUrl = process.env.REACT_APP_API_BASEURL + "/api/v1/sla";

class SlaService {

    async getAllSLA() {
        try {
            const response = await axios.get(apiUrl, {
                headers: authHeader(),
            })
            if (response.data && response.data.data.length > 0) {
                return response.data
            }
        } catch (error) {
            return { error }
        }
    }

    async getSLAByBranch() {
        try {
            const response = await axios.get(apiUrl + "/branch", {
                headers: authHeader()
            })
            if (response.data) {
                return response.data
            }
        } catch (error) {
            return { error }
        }
    }

    async createSLA({ branch_id, capacity }) {
        try {
            const response = await axios.post(
                apiUrl + "/create",
                {
                    branch_id,
                    capacity
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

    async updateSLA({ branch_id , capacity  }){
        try {
            const response = await axios.put(
                apiUrl + "/" + branch_id,
                {
                    capacity
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

    async getRecomendSLA({ branch_id }) {
        try {
            const response = await axios.post(
                apiUrl + "/recomendation",
                {
                    branch_id
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


export default new SlaService();