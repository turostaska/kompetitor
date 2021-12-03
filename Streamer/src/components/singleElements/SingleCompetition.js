import React, {Component} from 'react';
// import SingleStage from "./SingleStage";
import SingleCompetitor from "./functionComponents/SingleCompetitor";
import SingleReferee from "./functionComponents/SingleReferee";
import {MainPageComponent} from "../MainPageComponent";
import {ResultsViewComponent} from "./ResultsViewComponent";
import {MainPageEnum} from "../../enums/MainPageEnum";
import competitionService from "../../services/CompetitionService";

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

                            await this.props.mainPage.openResultsView()
                        }
                    }>Choose</button>
                </td>
                <td>{this.props.competition.id}</td>
                <td>{this.props.competition.admin.username}</td>
                <td>{this.props.competition.competitorLimit}</td>
                <td>{this.props.competition.startDate}</td>
                <td>{this.props.competition.type}</td>

            </tr>
            {/*{this.state.open === false ? "" : singleStateDisplay}*/}
            </tbody>
        )
    }
}

export default SingleCompetition