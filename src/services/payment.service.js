import axios from "axios";
import authHeader from "../utils/auth-header";

export default new PaymentService();
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

  async insertPayment({ customer_name, request, amount, amount_counted, account_number, account_name, payment_date }) {
    try {
        const dataPayment =
        {
            customer_name: customer_name,
            request: request,
            amount: parseInt(amount),
            amount_counted: amount_counted,
            account_number: account_number,
            account_name: account_name,
            payment_date: payment_date,
        }

        const response = await axios.post(apiUrl+"/create", dataPayment, { headers: authHeader() })
        if (response.data) {
            return response.data
        }
    } catch (error) {
        return { error }
    }
}
}

export default new PaymentService();
