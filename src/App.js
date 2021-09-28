import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginCustomer from "./pages/customer/LoginCustomer";
import IsiFormPayment from "./pages/customer/IsiFormPayment";
import HasilFormPayment from "./pages/customer/HasilFormPayment";
import LoginOfficer from "./pages/officer/LoginOfficer";
import CustomerHome from "./pages/customer/Home";
import AccountingHome from "./pages/officer/accounting/Home";
import AdminHome from "./pages/officer/admin/Home";
import AdminAddUser from "./pages/officer/admin/AddUser";
import AdminDetailUser from "./pages/officer/admin/DetailUser";
import AdminAddBranch from "./pages/officer/admin/AddBranch";
import AdminUpdateUser from "./pages/officer/admin/UpdateUser";
import GeneralSupportHome from "./pages/officer/generalSupport/Home";
import ServiceLevelAgreement from "./pages/officer/admin/ServiceLevelAgreement";
import PaymentRequestDetailGeneralSupport from "./pages/officer/generalSupport/PaymentRequestDetail";
import PaymentRequestDetailAcounting from "./pages/officer/accounting/PaymentRequestDetail";
import PaymentRequestDetailCustomer from "./pages/customer/HasilFormPayment";
import BranchOfficeList from "./pages/officer/admin/BranchOfficeList";
import PageNotFound from "./pages/errors/PageNotFound";
import Backdoor from "./pages/backdoor/Backdoor";
import PreloginRoutes from "./components/protectedRoutes/PreloginRoutes";
import PostloginRoutes from "./components/protectedRoutes/PostloginRoutes";

function App() {
  return (
    <Router>
      <Switch>
        <PreloginRoutes exact path="/" component={LoginCustomer} />
        <PreloginRoutes path="/login-officer" component={LoginOfficer} />
        <PostloginRoutes
          exact
          path="/customer"
          component={CustomerHome}
          role="customer"
        />
        <PostloginRoutes
          exact
          path="/admin"
          component={AdminHome}
          role="admin"
        />
        <PostloginRoutes
          exact
          path="/add-user"
          component={AdminAddUser}
          role="admin"
        />
        <PostloginRoutes
          exact
          path="/update-user"
          component={AdminUpdateUser}
          role="admin"
        />
        <PostloginRoutes
          exact
          path="/branch-office-list"
          component={BranchOfficeList}
          role="admin"
        />
        <PostloginRoutes
          exact
          path="/add-branch"
          component={AdminAddBranch}
          role="admin"
        />
        <PostloginRoutes
          exact
          path="/detail-user"
          component={AdminDetailUser}
          role="admin"
        />
        <PostloginRoutes
          exact
          path="/accounting"
          component={AccountingHome}
          role="accounting"
        />
        <PostloginRoutes
          exact
          path="/general-support"
          component={GeneralSupportHome}
          role="general-support"
        />
        <PostloginRoutes
          exact
          path="/add-payment-request"
          component={IsiFormPayment}
          role="customer"
        />
        <PostloginRoutes
          exact
          path="/payment-request-result"
          component={HasilFormPayment}
          role="customer"
        />
        <PostloginRoutes
          exact
          path="/service-level-agreement"
          component={ServiceLevelAgreement}
          role="admin"
        />
        <PostloginRoutes
          exact
          path="/generalSupport/payment-detail/:id"
          component={PaymentRequestDetailGeneralSupport}
          role="general-support"
        />
        <PostloginRoutes
          exact
          path="/accounting/payment-detail/:id"
          component={PaymentRequestDetailAcounting}
          role="accounting"
        />
        <PostloginRoutes
          exact
          path="/customer/payment-detail/:id"
          component={PaymentRequestDetailCustomer}
          role="customer"
        />
        <Route exact path="/backdoor" component={Backdoor} />

        {/* Masukan halaman baru diatas line ini */}
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
