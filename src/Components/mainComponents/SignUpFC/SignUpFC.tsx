import { AccountCircle } from "@mui/icons-material";
import { Typography, Box, TextField, ButtonGroup, Button } from "@mui/material";
import { common } from "@mui/material/colors";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import "./SignUpFC.css";
import CustomerDetails from "../../model/CustomerD";
import globals from "../../utils/Globals";
import axios from "axios";
import notify from "../../utils/Notify";

function SignUpFC(): JSX.Element {

    let navigate = useNavigate();

    const {register, handleSubmit, formState: { errors }} = useForm<CustomerDetails>();
    
    function send(userDetails:CustomerDetails){
        console.log(userDetails);
        console.log(globals.urls.guest+"addNewCustomer");
        axios.post<string>(globals.urls.guest+"addNewCustomer", userDetails)
        .then((response)=>{console.log(response.data);
            notify.success("successfully added");
            navigate("/login");
        }).catch(error=>{
            
            notify.error("error while adding a customer")
        });
    }

    return (
        <div className="SignUpFC">
            <div className="loginn">
                <form onSubmit={handleSubmit(send)}>
                    <Typography variant="h4" className="HeadLine">Get started with us today!</Typography><br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Email" variant="standard"
                        {...register("email",{
                            required : {value : true, message : "field is required"}
                            ,minLength: {value : 5, message :"minimum length must be 5"}  
                        })} />
                    </Box>
                    <span> {errors.email && <p>{errors.email.message}</p>}</span>
                    <br/><br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="First Name" variant="standard"
                        {...register("first_name",{
                            required : {value : true, message : "field is required"}
                            ,minLength: {value : 5, message :"minimum length must be 5"}  
                        })} />
                    </Box>
                    <span> {errors.email && <p>{errors.email.message}</p>}</span>
                    <br/><br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Last Name" variant="standard"
                        {...register("last_name",{
                            required : {value : true, message : "field is required"}
                            ,minLength: {value : 5, message :"minimum length must be 5"}  
                        })} />
                    </Box>
                    <span> {errors.email && <p>{errors.email.message}</p>}</span>
                    <br/><br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="standard-password-input" label="Password" type="password" autoComplete="current-password" variant="standard"
                        {...register("password",{
                            required : {value : true, message : "field is required"},
                            
                            maxLength: {value : 20, message : "maximum length is 20"}
                        })} />
                    </Box>
                    <span> {errors.password && <p>{errors.password.message}</p>}</span>
                    <br/><br/>
                    
                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" color="primary">Send</Button>                    
                    </ButtonGroup>
                    <br /><br />
                    <Typography variant="h6" className="HeadLine" color={common.black}>Already have an account? Login  
                    <NavLink className="signUp"  to="/Login">here </NavLink>
                    </Typography><br/>
                </form>
            </div>
        </div>
    );
}

export default SignUpFC;


