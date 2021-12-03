// @flow
import * as React from 'react';
import {MainPageComponent} from "../MainPageComponent";
import refereeService from "../../services/RefereeService";
import SingleMatch from "./SingleMatch";
import competitionService from "../../services/CompetitionService";
import SingleGroupScore from "./SingleGroupScore";

export class ResultsViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            competition: this.props.competition,
            mainPage: this.props.mainPage,
            scores: []
        }
        this.setScores()
    }

    setScores = () => {
        competitionService.getResultsFor(this.state.competition, this.state.token).then(async result => {
            if (result.status === 200) {
                this.setState({ scores: [] })
                for (let i=0; i < result.data.length; i++) {
                    let results = result.data[i].resultPerGroups
                    for (let i=0; i < results.length; i++) {
                        let score = results[i]
                        this.setState({scores: [...this.state.scores, score]});
                    }
                }
            }
            }
        )
    }

    render() {
        let comp = this.state.competition

        let stages = comp.currentStage >= 0 ? comp.stages[comp.currentStage]["matches"].map(match =>
            <SingleMatch match={match} placeholder={comp.currentStage} token={this.state.token}/>
        ) : []

        let scores = this.state.scores.map(score => <SingleGroupScore group={score} competition={comp} token={this.state.token}/>)

        return (
            <div>
                <div>{stages}</div>
                <div>{scores}</div>
            </div>
        );
    };

    refreshCompetition = () => {
        refereeService.getCompetition(this.state.competition, this.state.token).then(async result => {
            if (result.status === 200) {
                await this.setState({competition: result.data})
            }
        })
    }
}