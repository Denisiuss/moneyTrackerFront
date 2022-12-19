import Table from "../table/table";
import "./incomesDashboard.css";

function IncomesDashboard(): JSX.Element {
    return (
        <div className="incomesDashboard">
            <br /><br />
			<Table type="onlyIncomes"></Table>
        </div>
    );
}

export default IncomesDashboard;
