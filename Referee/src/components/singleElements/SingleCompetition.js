import React, {Component} from 'react';
// import SingleStage from "./SingleStage";
import SingleCompetitor from "./functionComponents/SingleCompetitor";
import SingleReferee from "./functionComponents/SingleReferee";
import {MainPageComponent} from "../MainPageComponent";
import {CompetitionEditor} from "./CompetitionEditor";
import {MainPageEnum} from "../../enums/MainPageEnum";

class SingleCompetition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            stages: this.props.competition.stages,
            token: this.props.token,
        }
    }

    render() {
        let singleCompetitorDisplay = this.props.competition.competitors.map((com) => {
            return( <SingleCompetitor competitor={com} />);
        });
        let singleRefereeDisplay = this.props.competition.referees.map((ref) => {
            return( <SingleReferee referee={ref}/> );
        });
        return(<tbody>
            <tr>
                <td>
                    <button onClick={
                        async () => {
                            await this.props.mainPage.setCompetition(this.props.competition)
                            await this.props.mainPage.openCompetitionEditor()
                        }
                    }>Choose</button>
                </td>
                <td>{this.props.competition.id}</td>
                <td>{this.props.competition.admin.username}</td>
                <td>{this.props.competition.competitorLimit}</td>
                <td>{this.props.competition.startDate}</td>
                <td>{this.props.competition.type}</td>
                <td>{this.state.length === 0 ? "No stages to show" : "Click the Expand button to see every stage and its matches"}</td>
                <td>
                    <div className="dropdown">
                        <button className="dropdown-toggle" type="button"
                                data-toggle="dropdown">Competitors
                            <span className="caret"/></button>
                        <ul className="dropdown-menu">
                            {this.props.competition.competitors.length === 0 ? <li>"No competitors"</li> : singleCompetitorDisplay}
                        </ul>
                    </div>
                </td>
                <td>
                    <div className="dropdown">
                        <button className="dropdown-toggle" type="button"
                                data-toggle="dropdown">Referees
                            <span className="caret"/></button>
                        <ul className="dropdown-menu">
                            {singleRefereeDisplay}
                        </ul>
                    </div>
                </td>
            </tr>
            {/*{this.state.open === false ? "" : singleStateDisplay}*/}
            </tbody>
        )
    }
}

export default SingleCompetition