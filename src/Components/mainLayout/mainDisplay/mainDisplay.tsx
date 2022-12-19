import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Chart from "../../mainComponents/chart/chart";
import Featured from "../../mainComponents/featured/featured";
import Table from "../../mainComponents/table/table";
import Widget from "../../mainComponents/widget/widget";
import store from "../../redux/store";
import notify from "../../utils/Notify";
import "./mainDisplay.css";

function MainDisplay(): JSX.Element {

    let navigate = useNavigate();

    const [userName, setUserName] = useState<string>();

    
    useEffect(()=>{
        if (store.getState().authState.isLogin !== true){
            notify.error("you are not allowed to enter!")
            navigate("/login");
        }

        setUserName(store.getState().authState.loginUser.name);
        console.log(userName);
                
    });

    
    return (
        <div className="mainDisplay">
			<div className="mainscreen">
                <div className="bg-image"> <h1 className="mainName"> Hello {userName}</h1> </div> <br />
                <div className="widgets">
                    <Widget type="payment"/>
                    <Widget type="income"/>
                    <Widget type="balance"/>
                </div>
                <div className="charts">
                    <Featured/>
                    <Chart/>
                </div>
                <div className="listContainer">
                    <div className="listTitle">
                        Latest transactions
                        <li><NavLink className="a"  to="/payments/new">Add Payment</NavLink></li>
                        </div>
                    <Table type="allPayments"/>
                </div>
            </div>
        </div>
    );
}

export default MainDisplay;
