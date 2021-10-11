import axios from "axios";
import authHeader from "../utils/auth-header";
import AuthService from "./auth.service";
AuthService.setupInterceptor();
const apiUrl = process.env.REACT_APP_API_BASEURL + "/api/v1/payment-request";

class PaymentService {
  async getCustomerPaymentRequestList() {
    try {
      const response = await axios.get(apiUrl, {
        headers: authHeader(),
      });
      if (Boolean(response.data)) {
        return response.data;
      }
    } catch (error) {
      return { error };
    }
  }

  async getOfficerPaymentRequestList() {
    try {
      const response = await axios.get(apiUrl + "/validation", {
        headers: authHeader(),
      });
      if (Boolean(response.data)) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async getDetailPayment(id) {
    try {
      const response = await axios.get(apiUrl + "/detail/" + id, {
        headers: authHeader(),
      });
      if (Boolean(response.data)) {
        return response.data
      }
    }
    catch (error) {
      return { error };
    }
  }
  async updatePaymentRequestStage(data) {
    const { idPayment, stagePayment, reason } = data;
    try {
      const response = await axios.put(apiUrl, {
        id: idPayment,
        stage: stagePayment,
        reason
      }, {
        headers: authHeader(),
      });

      if (Boolean(response.data)) {
        return response.data
      }
    }
    catch (error) {
      return { error };
    }
  }
}

export default new PaymentService();
