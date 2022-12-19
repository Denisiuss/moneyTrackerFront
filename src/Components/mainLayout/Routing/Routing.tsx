import { BrowserRouter, Route, Routes} from "react-router-dom";
import LoginFC from "../../mainComponents/LoginFC/LoginFC";
import SignUpFC from "../../mainComponents/SignUpFC/SignUpFC";
import NewPayment from "../../mainComponents/newPayment/newPayment";
import MainDisplay from "../mainDisplay/mainDisplay";
import IncomesDashboard from "../../mainComponents/incomesDashboard/incomesDashboard";
import PaymentsDashboard from "../../mainComponents/paymentsDashboard/paymentsDashboard";
import Page404 from "../page404/page404";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<MainDisplay />} />
                <Route path="/home" element={<MainDisplay />} />
                <Route path="/payments/new" element={<NewPayment />} />
                <Route path="/login" element={<LoginFC />} />
                <Route path="/signUp" element={<SignUpFC />} />
                <Route path="/customerPayments" element={<PaymentsDashboard />} />
                <Route path="/customerIncomes" element={<IncomesDashboard />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;