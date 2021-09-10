import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginCustomer from "./pages/customer/LoginCustomer";
import IsiFormPayment from "./pages/customer/IsiFormPayment";
import HasilFormPayment from "./pages/customer/HasilFormPayment";
import LoginOfficer from "./pages/officer/LoginOfficer";
import CustomerHome from "./pages/customer/Home";
import AccountingHome from "./pages/officer/accounting/Home";
import AdminHome from "./pages/officer/admin/Home";
import AdminAddUser from "./pages/officer/admin/AddUser";
import AdminUpdateUser from "./pages/officer/admin/UpdateUser";
import GeneralSupportHome from "./pages/officer/generalSupport/Home";
import PaymentRequestDetailGeneralSupport from "./pages/officer/generalSupport/PaymentRequestDetail";
import PaymentRequestDetailAcounting from "./pages/officer/accounting/PaymentRequestDetail";
import ServiceLevelAgreement from "./pages/officer/admin/ServiceLevelAgreement";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={LoginCustomer} />
        <Route path="/login-officer" component={LoginOfficer} />
        <Route exact path="/customer" component={CustomerHome} />
        <Route exact path="/admin" component={AdminHome} />
        <Route exact path="/add-user" component={AdminAddUser} />
        <Route exact path="/update-user" component={AdminUpdateUser} />
        <Route exact path="/accounting" component={AccountingHome} />
        <Route exact path="/general-support" component={GeneralSupportHome} />
        <Route exact path="/add-payment-request" component={IsiFormPayment} />
        <Route exact path="/payment-request-result" component={HasilFormPayment} />
        <Route exact path="/service-level-agreement" component={ServiceLevelAgreement} />
        <Route exact path="/generalSupport/payment-detail" component={PaymentRequestDetailGeneralSupport} />
        <Route exact path="/accounting/payment-detail" component={PaymentRequestDetailAcounting} />
      </Router>
    </>
  );
}

export default App;
