import React, {Component} from "react";
import Nav from 'react-bootstrap/Nav';
import {MainPageEnum} from "../enums/MainPageEnum";
import CompetitionList from "./CompetitionList";
import CreateCompetition from "./CreateCompetition";
import CreateTeams from "./CreateTeams";
import JoinScreen from "./JoinScreen";
import InviteScreen from "./InviteScreen";

class MainPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.userToken,
            screen: MainPageEnum.CompetitionList,
            switchFunc: () => {},
        };
    }
    toCreateCompetition =  () => {
        this.setState({screen: MainPageEnum.CreateCompetition, switchFunc: this.switchScreen});
    }
    toCompetitionList =  () => {
        this.setState({screen: MainPageEnum.CompetitionList, switchFunc: this.switchScreen});
    }
    toCreateTeam =  () => {
        this.setState({screen: MainPageEnum.CreateTeam, switchFunc: this.switchScreen});
    }
    toJoining =  () => {
        this.setState({screen: MainPageEnum.Joining, switchFunc: this.switchScreen});
    }
    toInvites =  () => {
        this.setState({screen: MainPageEnum.InviteScreen, switchFunc: this.switchScreen});
    }
    switchScreen = () =>{
        // eslint-disable-next-line default-case
        switch(this.state.screen){

            case MainPageEnum.CreateCompetition:
                return (<CreateCompetition token ={this.state.token}/>);
            case MainPageEnum.CreateTeam:
                return (<CreateTeams username={this.props.username} token ={this.state.token}/>);
            case MainPageEnum.Joining:
                return (<JoinScreen token ={this.state.token}/>);
            case MainPageEnum.InviteScreen:
                return (<InviteScreen username={this.props.username} token ={this.state.token}/>);

        }
    }

    render() {
        return (
            <div>
                <div id="header">
                    <Nav className="justify-content-center" defaultActiveKey={this.state.home}>
                        <Nav.Item>
                            <Nav.Link onClick={this.toCompetitionList}>"Home/Competitions"</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={this.toCreateCompetition}>Create Competition</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={this.toCreateTeam}>Create Team</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={this.toJoining}>Join Competition</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={this.toInvites}>Invites</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div id="body">
                    {this.state.screen === MainPageEnum.CompetitionList ? <CompetitionList token ={this.state.token}/> : ""}
                    {this.state.switchFunc()}
                </div>
            </div>
        );
    }
}

//TODO:          -Headers: -Cors a t??bbi klienshez
//               -versenyek eredm??nyei/??ll??sa
//               -verseny l??trehoz??sa
//               -felejelentkezhet?? versenyek kilist??z??sa
//               -csapatok l??trehoz??sa
//               -csapat megh??v??k kezel??se. Saj??t megh??v??k lek??r??se ??s elfogad??sa. Ez pedig megh??v??k k??ld??se api/teams/invitation/send

export default MainPageComponent;