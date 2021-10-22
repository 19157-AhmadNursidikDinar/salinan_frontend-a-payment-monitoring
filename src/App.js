import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginCustomer from "./pages/customer/LoginCustomer";
import IsiFormPayment from "./pages/customer/IsiFormPayment";
import HasilFormPayment from "./pages/customer/HasilFormPayment";
import LoginOfficer from "./pages/officer/LoginOfficer";
import CustomerHome from "./pages/customer/Home";
import AccountingHome from "./pages/officer/accounting/Home";
import AdminHome from "./pages/officer/admin/userManagement/Home";
import AdminAddUser from "./pages/officer/admin/userManagement/AddUser";
import AdminDetailUser from "./pages/officer/admin/userManagement/DetailUser";
import AdminAddBranch from "./pages/officer/admin/branchManagement/AddBranch";
import AdminUpdateUser from "./pages/officer/admin/userManagement/UpdateUser";
import GeneralSupportHome from "./pages/officer/generalSupport/Home";
import ServiceLevelAgreement from "./pages/officer/admin/slaManagement/ServiceLevelAgreement";
import AddServiceLevelAgreement from "./pages/officer/admin/slaManagement/AddServiceLevelAgreement";
import UpdateServiceLevelAgreement from "./pages/officer/admin/slaManagement/UpdateServiceLevelAgreement";
import PaymentRequestDetailGeneralSupport from "./pages/officer/generalSupport/PaymentRequestDetail";
import PaymentRequestDetailAccounting from "./pages/officer/accounting/PaymentRequestDetail";
import PaymentRequestDetailCustomer from "./pages/customer/HasilFormPayment";
import BranchOfficeList from "./pages/officer/admin/branchManagement/BranchOfficeList";
import PageNotFound from "./pages/errors/PageNotFound";
import PreloginRoutes from "./components/protectedRoutes/PreloginRoutes";
import PostloginRoutes from "./components/protectedRoutes/PostloginRoutes";
import ServiceLevelAgreementCustomer from "./pages/customer/ServiceLevelAgreement";
import ServiceLevelAgreementAccounting from "./pages/officer/accounting/ServiceLevelAgreement";
import ServiceLevelAgreementGeneralSupport from "./pages/officer/generalSupport/ServiceLevelAgreement";

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
          path="/update-user/:id"
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
          path="/detail-user/:id"
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
          path="/add-service"
          component={AddServiceLevelAgreement}
          role="admin"
        />
        <PostloginRoutes
          exact
          path="/update-service/:id"
          component={UpdateServiceLevelAgreement}
          role="admin"
        />
        <PostloginRoutes
          exact
          path="/service-level-agreement-customer"
          component={ServiceLevelAgreementCustomer}
          role="customer"
        />
        <PostloginRoutes
          exact
          path="/service-level-agreement-gs"
          component={ServiceLevelAgreementGeneralSupport}
          role="general-support"
        />
        <PostloginRoutes
          exact
          path="/service-level-agreement-accounting"
          component={ServiceLevelAgreementAccounting}
          role="accounting"
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
          component={PaymentRequestDetailAccounting}
          role="accounting"
        />
        <PostloginRoutes
          exact
          path="/customer/payment-detail/:id"
          component={PaymentRequestDetailCustomer}
          role="customer"
        />

        {/* Masukan halaman baru diatas line ini */}
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
