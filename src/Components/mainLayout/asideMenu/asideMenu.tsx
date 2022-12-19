import { useContext } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./asideMenu.css";
import { logoutUser } from "../../redux/authState";
import store from "../../redux/store";
import notify from "../../utils/Notify";

function AsideMenu(): JSX.Element {

    let navigate = useNavigate();

    function openMenu() {
        document.getElementById("asideMenu")?.classList.toggle('active')
    }

    function logOut(){
        store.dispatch(logoutUser());
        notify.success("successfully loged out");
        navigate("/login");
    }
    
    return (
        <div className="asideMenu" id="asideMenu">
            
            <div className="toggle-btn" onClick={openMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul>
                <li>Menu</li>
                <li><NavLink className="a"  to="/home">Dashboard</NavLink></li>
                <li><NavLink className="a"  to="/customerPayments">Payments</NavLink></li>
                <li><NavLink className="a"  to="/customerIncomes">Income</NavLink></li>
                <li onClick={logOut}><ExitToAppIcon className="exit" sx={{ color: 'action.active', mr: 1, my: 0.5 }}/></li>
            </ul>
        </div>
    );
}

export default AsideMenu;
