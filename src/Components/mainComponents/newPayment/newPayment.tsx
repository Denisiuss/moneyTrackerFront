import "./newPayment.css";
import { useForm } from "react-hook-form";
import PaymentData from "../../model/PaymentD";
import { Typography, Box, TextField, Select, MenuItem, ButtonGroup, Button, OutlinedInput, InputLabel, FormControl } from "@mui/material";
import TitleIcon from '@mui/icons-material/Title';
import CategoryIcon from '@mui/icons-material/Category';
import PaidIcon from '@mui/icons-material/Paid';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ReceiptIcon from '@mui/icons-material/Receipt';
import globals from "../../utils/Globals";
import axios from "axios";
import notify from "../../utils/Notify";
import { useNavigate } from "react-router-dom";
import React from "react";
import { stringify } from "querystring";
import store from "../../redux/store";
import { loginUserString } from "../../redux/authState";

function NewPayment(): JSX.Element {

    let navigate = useNavigate();

    const [type, setType] = React.useState('');

    const [receipt, setReceipt] = React.useState('');

    const {register, handleSubmit, setError,  formState: { errors }} = useForm<PaymentData>();

    function send (paymentData:PaymentData){
        paymentData.customerId=Number(store.getState().authState.loginUser.userId);
        console.log(paymentData);
        console.log(globals.urls.customer+"addPayment");
        let token: string = store.getState().authState.loginUser.token;
        console.log(token);
        axios.post<string>(globals.urls.customer+"addPayment", paymentData, {headers: {"Authorization": token}})
        .then((response)=>{
            //store.dispatch(loginUserString(response.headers["Authorization"]));
            console.log(response.headers["Authorization"])
            console.log(response.data);
            console.log(response);
            console.log(response.headers.Authorization);
            notify.success("successfully added");
            navigate("/home");
        }).catch(error=>{
            notify.error("error while adding a payment")
            console.log(error);
        });
    }

    return (
        <div className="newPayment">
            <div className="add">
                <form onSubmit={handleSubmit(send)}>
                    <Typography variant="h4" className="HeadLine">Add new Payment</Typography><br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TitleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="title"  variant="standard"
                         {...register("title", {
                            required: {value:true, message : "this field is required"},
                            maxLength: {value: 20 , message : "max length is 20"}
                         })}/>
                    </Box>
                    <br/>
                    <span> {errors.title && <p>{errors.title.message}</p>}</span>
                    <br/>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <CategoryIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <FormControl>
                        <InputLabel id="just input">Type</InputLabel>
                            <Select style={{width:200}} label="categories" variant="standard"
                                {...register("categories", {
                                    required: {value:true, message : "this field is required"}
                                 })}>
                            <MenuItem value={"Payments"}>Payment</MenuItem> <br />
                            <MenuItem value={"Incomes"}>Income</MenuItem>  <br />
                        </Select>
                        </FormControl>   
                    </Box>
                    <br/>
                    <span> {errors.categories && <p>{errors.categories.message}</p>}</span>
                    <br/>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PaidIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField  id="input-with-sx" label="amount" variant="standard" 
                    {...register("amount",{
                         required: {value:true, message : "this field is required"}   
                    })}/>
                    </Box>
                    <br/>
                    <span> {errors.amount && <p>{errors.amount.message}</p>}</span>
                    <br/>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <ScheduleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="date" label="purchase date" type="date" InputLabelProps={{ shrink: true,}}
                                {...register("purchase_date",{
                                    required: {value:true, message : "this field is required"} 
                                })}/>
                    </Box>
                    <br/>
                    <span> {errors.purchase_date && <p>{errors.purchase_date.message}</p>}</span>
                    <br/>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ReceiptIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl>
                        <InputLabel id="just input">Receipt</InputLabel>
                            <Select style={{width:200}} label="Receipt"  variant="standard"
                                {...register("receipt",{
                                    required: {value:true, message : "this field is required"} 
                                })}>
                            <MenuItem value={"Yes"}>Yes</MenuItem> <br />
                            <MenuItem value={"No"}>No</MenuItem>  <br />
                        </Select>
                        </FormControl>
                    </Box>
                    <br/>
                    <span> {errors.receipt && <p>{errors.receipt.message}</p>}</span>
                    <br/>
                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" color="primary">Send</Button>
                    </ButtonGroup>
                </form>
            </div>  
        </div>
    );
}

export default NewPayment;


