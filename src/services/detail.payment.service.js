import axios from "axios";
import authHeader from "../utils/auth-header";
const apiUrl = process.env.REACT_APP_API_BASEURL + "/api/v1/payment-request/detail/";

//making class DetailPaymentService
class DetailPaymentService {
    async getCustomerDetailPayment(id) {
        try {
            const response = await axios.get(apiUrl+id, {
                headers: authHeader(),
            });
            if(Boolean(response.data)){
                return response.data
            }
        }
        catch (error) {
            return { error };
        }   
    }

    async getOfficerDetailPayment(id) {
        try{
            const response = await axios.get(apiUrl+id, {
                headers: authHeader(),
            });
            if(Boolean(response.data)){
                return response.data
            }
        }
        catch (error) {
            return { error };
        }
    }
}

export default new DetailPaymentService();