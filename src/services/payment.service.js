import axios from "axios";
import authHeader from "../utils/auth-header";

const apiUrl = process.env.REACT_APP_API_BASEURL + "/api/v1/payment-request/create"

class PaymentService {
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

            const response = await axios.post(apiUrl, dataPayment, { headers: authHeader() })
            if (response.data) {
                return response.data
            }
        } catch (error) {
            return { error }
        }
    }
}

export default new PaymentService();