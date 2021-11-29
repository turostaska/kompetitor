import React, {Component} from "react";
import Nav from 'react-bootstrap/Nav';
import {MainPageEnum} from "../enums/MainPageEnum";
import CompetitionList from "./CompetitionList";
import {CompetitionEditor} from "./singleElements/CompetitionEditor";

class MainPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.userToken,
            screen: MainPageEnum.CompetitionList,
            switchFunc: () => {},
            competition: null,
        };
    }

    listCompetitions = () => {
        this.setState({
            screen: MainPageEnum.CompetitionList,
            switchFunc: this.switchScreen
        })
    }

    openCompetitionEditor = () => {
        this.setState({
            screen: MainPageEnum.CompetitionEditor,
            switchFunc: this.switchScreen
        })
    }

    sayState = () => { alert("competition is " + this.state.competition) }

    setCompetition = (competition) => this.setState({competition: competition})

    switchScreen = () =>{
        // eslint-disable-next-line default-case
        switch (this.state.screen) {
            case MainPageEnum.CompetitionList:
                return (<CompetitionList token={this.state.token} mainPage={this}/>)
            case MainPageEnum.CompetitionEditor:
                return (<CompetitionEditor token={this.state.token} mainPage={this} competition={this.state.competition}/>)
        }
    }

    render() {
        return (
            <div>
                <div id="header">
                    <Nav className="justify-content-center" defaultActiveKey={this.state.home}>
                        <Nav.Item>
                            <Nav.Link onClick={this.listCompetitions}>"Home/My Competitions"</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div id="body">
                    {this.state.switchFunc()}
                </div>
            </div>
        );
    }
}

export default MainPageComponent;