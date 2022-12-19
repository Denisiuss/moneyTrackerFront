import { AccountCircle } from "@mui/icons-material";
import { Typography, Box, TextField, ButtonGroup, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import UserDetails from "../../model/UserDetails";
import LockIcon from '@mui/icons-material/Lock';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import "./LoginFC.css";
import { NavLink, useNavigate } from "react-router-dom";
import { common } from "@mui/material/colors";
import axios from "axios";
import globals from "../../utils/Globals";
import notify from "../../utils/Notify";
import store from "../../redux/store";
import { loginUserString } from "../../redux/authState";

function LoginFC(): JSX.Element {

    let navigate = useNavigate();

    const {register, handleSubmit, formState: { errors }} = useForm<UserDetails>();
    
    const [jwtToken,setToken] = useState("User has no token, bad bad user !!!");

    function send(userDetails:UserDetails){
        console.log(userDetails);
        console.log(globals.urls.customer+"Login");
        axios.post<string>(globals.urls.customer+"Login", userDetails)
        .then((response)=>{console.log(response.data);
            setToken(response.data);
            store.dispatch(loginUserString(response.data));
            notify.success("successfully logged in");
            navigate("/home");
        }).catch(error=>{
            notify.error("error while loging in");
            setToken("Error in getting response from the server");
        });
    }

    return (
        <div className="LoginFC">
            <div className="loginn">
                <form onSubmit={handleSubmit(send)}>
                    <Typography variant="h4" className="HeadLine">Login to your Money Tracker account</Typography><br/>
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
                    <Typography variant="h6" className="HeadLine" color={common.black}>Don't have an account yet? Sign Up  
                    <NavLink className="signUp"  to="/signUp">here </NavLink>
                    </Typography><br/>
                </form>
            </div>
        </div>
    );
}

export default LoginFC;
