// @flow
import * as React from 'react';
import {MainPageComponent} from "../MainPageComponent";
import refereeService from "../../services/RefereeService";
import SingleMatch from "./SingleMatch";

export class CompetitionEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            competition: this.props.competition,
            mainPage: this.props.mainPage,
            currentStageConcluded: false
        }
        this.isCurrentStageConcluded()
    }

    render() {
        let comp = this.state.competition
        console.log(JSON.stringify(comp))
        let stages = comp.currentStage >= 0 ? comp.stages[comp.currentStage]["matches"].map(match =>
            // <div>{match.id}</div>
            <SingleMatch match={match} placeholder={comp.currentStage} token={this.state.token}/>
        ) : []

        return (
            <div> {
                <button onClick={
                    async () => {
                        await this.advanceToNextStage()
                    }
                } disabled={!this.state.currentStageConcluded}>Advance</button>
                    // this.props.token + " " + this.state.competition.id
                }
                {stages}
            </div>

        );
    };

    isCurrentStageConcluded = () => {
        refereeService.currentStageConcluded(this.state.competition, this.state.token).then(async result => {
            if (result.status === 200) {
                await this.setState({currentStageConcluded: result.data})
            }
        })
        this.render()
    }

    advanceToNextStage = () => {
        refereeService.advanceToNextStage(this.state.competition, this.state.token).then(result => {
            if (result.status === 200) {
                this.refreshCompetition()
                this.isCurrentStageConcluded()
            }
        })
    }

    refreshCompetition = () => {
        refereeService.getCompetition(this.state.competition, this.state.token).then(async result => {
            if (result.status === 200) {
                await this.setState({competition: result.data})
            }
        })
    }
}