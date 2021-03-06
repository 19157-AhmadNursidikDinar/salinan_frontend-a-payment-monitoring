import axios from "axios";
import authHeader from "../utils/auth-header";
import AuthService from "./auth.service";
AuthService.setupInterceptor();
const apiUrl = process.env.REACT_APP_API_BASEURL + "/api/v1/payment-request";

class PaymentService {
  async getCustomerPaymentRequestList(page = 1, filter) {
    try {
      let urlParam = `?page=${page}&size=8`;
      if (Boolean(filter)) {
        urlParam = `/${filter}` + urlParam;
      }
      const response = await axios.get(apiUrl + urlParam, {
        headers: authHeader(),
      });
      if (Boolean(response.data)) {
        return response.data;
      }
    } catch (error) {
      return { error };
    }
  }

  async getOfficerPaymentRequestList(page = 1) {
    try {
      const response = await axios.get(
        apiUrl + `/validation?page=${page}&size=8`,
        {
          headers: authHeader(),
        }
      );
      if (Boolean(response.data)) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async insertPayment({
    customer_name,
    customer_phone,
    request,
    request_other,
    amount,
    amount_counted,
    account_number,
    account_name,
  }) {
    try {
      const dataPayment = {
        customer_name: customer_name,
        phone: customer_phone,
        request: request,
        request_other: request_other,
        amount: parseInt(amount),
        amount_counted: amount_counted,
        account_number: account_number,
        account_name: account_name,
      };

      const response = await axios.post(apiUrl + "/create", dataPayment, {
        headers: authHeader(),
      });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return { error };
    }
  }

  async getDetailPayment(id) {
    try {
      const response = await axios.get(apiUrl + "/detail/" + id, {
        headers: authHeader(),
      });
      if (Boolean(response.data)) {
        return response.data;
      }
    } catch (error) {
      return { error };
    }
  }

  async updatePaymentRequestStage(data) {
    const { idPayment, stagePayment, reason } = data;
    try {
      const response = await axios.put(
        apiUrl,
        {
          id: idPayment,
          stage: stagePayment,
          reason,
        },
        {
          headers: authHeader(),
        }
      );

      if (Boolean(response.data)) {
        return response.data;
      }
    } catch (error) {
      return { error };
    }
  }
}

export default new PaymentService();
