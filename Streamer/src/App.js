import './App.css';
import UserLoginComponent from "./components/UserLoginComponent";
import {Component} from "react";
import MainPageComponent from "./components/MainPageComponent";

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
                {this.state.logged_in ? <MainPageComponent userToken={this.state.token}/> :
                    <UserLoginComponent LoginSuccess={this.LoginSuccess}/>}
            </div>
        );
    }
}

export default App;
