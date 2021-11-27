import React, {Component} from "react";
import Nav from 'react-bootstrap/Nav';
import {MainPageEnum} from "../enums/MainPageEnum";

class MainPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.userToken,
            competitionMenu: "Home/Competitions",
            screen: MainPageEnum.CompetitionList
        };
    }
    toCreateCompetition =  () => {
        this.setState({screen: MainPageEnum.CreateCompetition});
    }
    toCompetitionList =  () => {
        this.setState({screen: MainPageEnum.CompetitionList});
    }
    toCreateTeam =  () => {
        this.setState({screen: MainPageEnum.CreateTeam});
    }
    toJoining =  () => {
        this.setState({screen: MainPageEnum.Joining});
    }
    toInvites =  () => {
        this.setState({screen: MainPageEnum.InviteScreen});
    }

    render() {
        return (
            <div>
                <div id="header">
                    <Nav className="justify-content-center" defaultActiveKey={this.state.home}>
                        <Nav.Item>
                            <Nav.Link href={this.toCompetitionList}>{this.state.competitionMenu}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href={this.toCreateCompetition}>Create Competition</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href={this.toJoining}>Joining</Nav.Link>
                    </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href={this.toCreateTeam}>Create Team</Nav.Link>
                    </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href={this.toInvites}>Invites</Nav.Link>
                    </Nav.Item>
                    </Nav>
                </div>
                <div id="body">
                    <button>Later</button>
                </div>
            </div>
        );
    }
}

//TODO: Headers: -Cors a többi klienshez
//               -versenyek eredményei/állása
//               -verseny létrehozása
//               -felejelentkezhető versenyek kilistázása
//               -csapatok létrehozása
//               -csapat meghívók kezelése. Saját meghívók lekérése és elfogadása. Ez pedig meghívók küldése api/teams/invitation/send

export default MainPageComponent;