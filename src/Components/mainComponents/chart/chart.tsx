import "./chart.css";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from "axios";
import { useState, useEffect } from "react";
import PaymentData from "../../model/PaymentD";
import store from "../../redux/store";
import globals from "../../utils/Globals";
import notify from "../../utils/Notify";
import { useNavigate } from "react-router-dom";
import { IncomingMessage } from "http";


function Chart(): JSX.Element {
    
    let navigate = useNavigate();

    let data = [{name: "", Total: 0}];

    var [income, setIncomeData] = useState([new PaymentData()]);

    if(income.length!==0){
        for (let j = 0; j<income.length; j++){
            data[j] = {name: income[j].purchase_date.substring(0,7), Total: income[j].amount}
        }
    }

  
    useEffect(()=>{
    if (store.getState().authState.isLogin !== true){
        notify.error("you are not allowed to enter!")
        navigate("/login");
    }
        axios.get(globals.urls.customer+"getLastSixMonthIncomes").then((response)=>{
            console.log(response.data); 
            setIncomeData(response.data);
        }).catch(error=>{console.log(error)});
        },[]);

     

    return (
        <div className="chart">
            <div className="title">Last 6 Month (Revenue)</div>
			<ResponsiveContainer width="100%" aspect={4 / 1}>
            <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;
