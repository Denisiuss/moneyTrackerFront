import Table from "../table/table";
import "./paymentsDashboard.css";

function PaymentsDashboard(): JSX.Element {
    return (
        <div className="paymentsDashboard">
            <br /><br />
			<Table type="onlyPayments"></Table>
        </div>
    );
}

export default PaymentsDashboard;
