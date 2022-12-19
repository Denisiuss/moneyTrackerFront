import OnlineUser from "../model/onlineUser";
import UserDetails from "../model/UserDetails";
import jwt_decode from "jwt-decode";

export class AuthState{
    public loginUser:OnlineUser = new OnlineUser();
    public isLogin:boolean = false;
}

export enum AuthActionType{
    LoginUser = "LoginUser",
    LogoutUser = "LogoutUser",
    RegisterUser = "RegisteUser",
    LoginUserString = "LoginUserString",
    IsLogged = "IsLogged"

}

export interface AuthAction{
    type:AuthActionType,
    payload?: any,
}

export function loginUser(user : OnlineUser):AuthAction{
    return {type: AuthActionType.LoginUser, payload:user}
}

export function logoutUser():AuthAction{
    return {type: AuthActionType.LogoutUser, payload: null}
}

export function isLoged(isLogin: boolean):AuthAction{
    return {type: AuthActionType.IsLogged, payload: isLogin}
}

export function registerUser(newUser:UserDetails):AuthAction{
    return {type: AuthActionType.RegisterUser, payload:newUser}
}

export function loginUserString(token:string):AuthAction{
    return {type: AuthActionType.LoginUserString, payload:token}
}


export function authReducer(currentState: AuthState = new AuthState(), action:AuthAction):AuthState{
    const newState = {...currentState};

    switch(action.type){
        case AuthActionType.LoginUser:
            newState.loginUser = action.payload;
            //insert token with value of the token into local storage
            localStorage.setItem("token",action.payload);
        break;
        case AuthActionType.IsLogged:
            newState.isLogin = true;
            break;
        case AuthActionType.LogoutUser:   
            newState.loginUser = new OnlineUser();
            //remove the token from local storage
            localStorage.removeItem("token");
            localStorage.removeItem("user_name");
            localStorage.removeItem("id");
            newState.isLogin = false;
        break;
        case AuthActionType.RegisterUser:
            //axios->login->data->loginUser
        break;
        case AuthActionType.LoginUserString:

            newState.loginUser.token = action.payload;
            localStorage.setItem("token",newState.loginUser.token);   
            newState.loginUser.userId = (JSON.parse(JSON.stringify(jwt_decode(newState.loginUser.token)))).userId;
            localStorage.setItem("id",newState.loginUser.userId);
            newState.loginUser.name = (JSON.parse(JSON.stringify(jwt_decode(newState.loginUser.token)))).userName;
            localStorage.setItem("user_name", newState.loginUser.name);
            newState.isLogin = true;           
        break;
    }

    return newState;
}
