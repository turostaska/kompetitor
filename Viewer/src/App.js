import logo from './logo.svg';
import './App.css';
import UserLoginComponent from "./components/UserLoginComponent";
import UserService from "./services/UserService";
import {Component} from "react";
import MainPageComponent from "./components/MainPageComponent";
import Nav from 'react-bootstrap/Nav';

class App extends Component {
    constructor(){
        super();
        this.state = {
            logged_in: false,
            token: ""
        }
    }
   LoginSuccess = (token) => {
        this.setState({logged_in: true, token: token});
   }
    render() {
        return (
            <div className="App">
                {this.state.logged_in === false? <UserLoginComponent LoginSuccess={this.LoginSuccess}/> : <MainPageComponent userToken={this.state.token} />}
            </div>
        );
    }
}

export default App;
