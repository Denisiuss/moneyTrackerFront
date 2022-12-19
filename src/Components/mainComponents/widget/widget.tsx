import "./widget.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import SouthIcon from '@mui/icons-material/South';
import { SyntheticEvent, useEffect, useState } from "react";
import { Payment } from "@mui/icons-material";
import PaymentData from "../../model/PaymentD";
import store from "../../redux/store";
import notify from "../../utils/Notify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import globals from "../../utils/Globals";
import PaymentD from "../../model/PaymentD";
import Popup from "../../mainLayout/popup/popup";
import CustomerDetails from "../../model/CustomerD";
import { useForm } from "react-hook-form";
import { Button, ButtonGroup, Typography } from "@mui/material";
import Table from "../table/table";


function Widget({type}: any): JSX.Element {
    let data;
    let navigate = useNavigate();
    let balanceId:string="";

    function updateNumber(args:SyntheticEvent){
        balanceId = (args.target as HTMLInputElement).value.toString();
    }

    var [payment, setPaymentData] = useState(new PaymentData());
    var [income, setIncomeData] = useState(new PaymentData());
    var [balance, setBalance] = useState(Number);
    var [customerDetails, setCustomerData] = useState(new CustomerDetails());

    const [popupActive, setPopupActive] = useState(false);
    const {handleSubmit, formState: { errors }} = useForm<CustomerDetails>();



    useEffect(()=>{
    if (store.getState().authState.isLogin !== true){
        notify.error("you are not allowed to enter!")
        navigate("/login");
    }
        axios.get(globals.urls.customer+"getLastPayment").then((response)=>{
            console.log(response.data[0]); 
            setPaymentData(response.data[0])
        }).catch(error=>{console.log(error)});

        axios.get(globals.urls.customer+"getLastIncome").then((response)=>{
            console.log(response.data[0]); 
            setIncomeData(response.data[0])
        }).catch(error=>{console.log(error)});

        axios.get(globals.urls.customer+"getCustomerBalance").then((response)=>{
            console.log(response.data[0]); 
            setBalance(response.data)
        }).catch(error=>{console.log(error)});

        },[]);

        function updateBalance(){
            axios.get(globals.urls.customer+"getCustomerData").then((response)=>{
                console.log(response.data);
                setCustomerData(response.data)
            }).catch(error=>{console.log(error)});

            customerDetails.balance = parseInt(balanceId);

            axios.post<string>(globals.urls.customer+"updateBalance" ,customerDetails)
            .then((response)=>{
                console.log(customerDetails);
                notify.success("successfully updated");
                setPopupActive(false);
            }).catch(error=>{
                notify.error("error while updating a customer")
            });
            setBalance(customerDetails.balance);
            setCustomerData(new CustomerDetails());
            balanceId="";
        }


    switch (type) {
        case "payment":
            data = {
                title: "LAST PAYMENT",
                amount:  payment.amount,
                link: <Button  variant="text" color="inherit" onClick={() => setPopupActive(popupActive ? false:true)}>See all payments</Button>,
                icon: <PaymentIcon className="icon" style={{color:"crimson"}}/>,
                popUpData: <div className="tableOnlypayments">
                            <Typography variant="h4" className="HeadLine">Your Payments</Typography><br/>
                            <Table type="onlyPayments"></Table>
                        </div>
            };
            break;
        case "income":
            data = {
                title: "LAST INCOME",
                amount: income.amount,
                link: <Button  variant="text" color="inherit" onClick={() => setPopupActive(popupActive ? false:true)}>See all Incomes</Button>,
                icon: <SouthIcon className="icon" style={{color:"goldenrod"}}/>,
                popUpData: <div className="tableIncome">
                                <Typography variant="h4" className="HeadLine">Your Incomes</Typography><br/>
                                <Table type="onlyIncomes"></Table>
                            </div>
            };
            break;
        case "balance":
            data = {
                title: "BALANCE",
                amount: balance,
                link: <Button  variant="text" color="inherit" onClick={() => setPopupActive(popupActive ? false:true)}>Change balance</Button>,
                icon: <AccountBalanceIcon className="icon" style={{color:"purple"}}/>,
                popUpData: <form onSubmit={handleSubmit(updateBalance)}>
                                <Typography variant="h4" className="HeadLine">Enter a Balance to change</Typography><br/>
                                <div className="col-3">
                                    <input className="effect-2" type="number" placeholder="Please enter a Balance to change" onChange={updateNumber}/>
                                    <span className="focus-border"></span>
                                </div><br />
                                <Button type="submit" variant="contained" color="primary">Change</Button>                    
                                <br />
                            </form>,
            };
            break;
       
    }
    
    return (
        <div className="widget">
			<div className="left">
                <span className="title">{data?.title}</span>
                <span className="counter">{data?.amount} ₪</span>
                <span className="link">{data?.link}</span>
            </div>
            <div className="right">
                <div className="percentage">
                <KeyboardArrowUpIcon/>   
                </div>
                {data?.icon}
            </div>
            <Popup active={popupActive} setActive={setPopupActive}>
                {data?.popUpData}
            </Popup>
        </div>
    );
}

export default Widget;
