import "./featured.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutLinedIcon from "@mui/icons-material/KeyboardArrowUpOutLined";
import axios from "axios";
import { useState, useEffect, SyntheticEvent} from "react";
import { useNavigate } from "react-router-dom";
import PaymentData from "../../model/PaymentD";
import store from "../../redux/store";
import globals from "../../utils/Globals";
import notify from "../../utils/Notify";


function Featured(): JSX.Element {

    let navigate = useNavigate();

    let dataToday = [{amount: 0}]
    let dataWeek = [{amount: 0}]
    let dataMonth = [{amount: 0}]

    const [todayIncome, setTodayIncomeData] = useState([new PaymentData()]);

    const [weekIncome, setWeekIncomeData] = useState([new PaymentData()]);

    const [monthIncome, setMonthIncomeData] = useState([new PaymentData()]);

    const [threeMonthsIncome, setThreeMonthsIncome] = useState([new PaymentData()]);

    const [customerTarget, setCustomerTarget] = useState();

    if (todayIncome.length!==0){
        for (let j = 0; j<todayIncome.length; j++){
            dataToday[j] = {amount: todayIncome[j].amount}
        }
    }
    
    if (weekIncome.length!==0){
        for (let j = 0; j<weekIncome.length; j++){
            dataWeek[j] = {amount: weekIncome[j].amount}
        }
    }

    if (monthIncome.length!==0){
        for (let j = 0; j<monthIncome.length; j++){
            dataMonth[j] = {amount: monthIncome[j].amount}
        }
    }

    let targetId:string="";
    let targetPercent:number=0;

    useEffect(()=>{
    if (store.getState().authState.isLogin !== true){
        notify.error("you are not allowed to enter!")
        navigate("/login");
    }
        axios.get(globals.urls.customer+"getTodayIncomes").then((response)=>{
            console.log(response.data); 
            setTodayIncomeData(response.data);
        }).catch(error=>{console.log(error)});

        axios.get(globals.urls.customer+"getWeekIncomes").then((response)=>{
            console.log(response.data); 
            setWeekIncomeData(response.data); 
        }).catch(error=>{console.log(error)});

        axios.get(globals.urls.customer+"getMonthIncomes").then((response)=>{
            console.log(response.data); 
            setMonthIncomeData(response.data);
        }).catch(error=>{console.log(error)});

        axios.get(globals.urls.customer+"getCustomerTarget").then((response)=>{
            console.log(response.data); 
            setCustomerTarget(response.data);
            updateTargetPercent();
        }).catch(error=>{console.log(error)});
        },[]);
 
        function updateTarget(args:SyntheticEvent){
            targetId = (args.target as HTMLInputElement).value.toString();
        }

        function updateTargetPercent(){
            targetPercent = Math.round(dataToday[0].amount/(Number(targetId) / 100));
            if (targetPercent>100){
                targetPercent=100;
            }
            console.log(targetPercent);
            return targetPercent;
        }

        function saveTarget(){

        }

    return (
        <div className="featured">
			<div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertIcon fontSize="small"/>
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={50} text={50 + " %"} strokeWidth={5}/>
                </div>
                <p className="titleC">Total incomes made today</p>
                <p className="amount">{dataToday[0].amount} ₪</p>
                <p className="desc">
                    Previous transactions processing. Last payments may not be included.
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownIcon fontSize="small"/>
                            <div className="resultAmount">{customerTarget} ₪</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last week</div>
                        <div className="itemResult positive">
                            <KeyboardArrowDownIcon fontSize="small"/>
                            <div className="resultAmount">{dataWeek[0].amount} ₪</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last month</div>
                        <div className="itemResult positive">
                            <KeyboardArrowDownIcon fontSize="small"/>
                            <div className="resultAmount">{dataMonth[0].amount} ₪</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Featured;
