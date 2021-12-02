import React, {Component} from 'react';
import NewUserService from "../services/UserService";

class UserLoginComponent extends Component{
    constructor() {
        super();
        this.state = {
            currentUser: {
                username: "",
                password: ""
            },
            componentTitle: "Log in",
            redirectText: "Don't have an account? Sign up here!",
            redirectButton: "Sign up!",
            login: true,
            token: ""
        }
    }

    SuccessfulLogin = ()=>{
        this.props.LoginSuccess(this.state.token, this.state.currentUser.username);
    }

    componentButton = () => {
        if (this.state.login) {
            NewUserService.postLogin(this.state.currentUser).then(response => {
                if(response.status === 200) {
                    console.log(response)
                    let helper = response.headers["authorization"];
                    this.setState({token: helper});
                    this.SuccessfulLogin();
                }
                else
                    this.showAlert();
            })
        }
        else {
            NewUserService.postSignup(this.state.currentUser).then(response => {
                if(!response.status === 200)
                    this.showAlert();
            });
        }
    }

    showAlert = () => {
        if(!this.state.login)
        alert("Sign up failed!");
        else
            alert("Log in failed! Sign up if you don't have an account!")
    }

    componentSwitch = () => {
        if (this.state.login) {
        this.setState({componentTitle: "Sign up", redirectText: "Log in page:", redirectButton: "Log in!", login: false});
    }
        else{
            this.setState({componentTitle: "Log in", redirectText: "Don't have an account? Sign up here!", redirectButton: "Sign up!", login: true});
        }
    }

    onUserNameChange = e => {
        let passwordHelper = this.state.currentUser.password;
        this.setState({currentUser: {username: e.target.value, password: passwordHelper}});
    }
    onPasswordChange = e => {
            let userNameHelper = this.state.currentUser.username;
            this.setState({currentUser: {username: userNameHelper, password: e.target.value}});
    }

    render(){
        return(
            <div>
                <h1 className = "text-center" >{this.state.componentTitle}</h1>
                <label id='login_userName'>Username</label>
                <br/>
                <input type='text' id="username" value={this.state.currentUser.username} onChange={this.onUserNameChange}/>
                <br/>
                <label id='login_password'>Password</label>
                <br/>
                <input type='password' id="password" value={this.state.currentUser.password} onChange={this.onPasswordChange}/>
                <button onClick={this.componentButton} >{this.state.componentTitle}</button>
                <br/>
                <p>{this.state.redirectText}</p>
                <button onClick={this.componentSwitch}>{this.state.redirectButton}</button>
            </div>
        )
    }
}

export default UserLoginComponent;