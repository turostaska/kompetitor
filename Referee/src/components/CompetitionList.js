import React, {Component} from 'react';
import SingleCompetition from "./singleElements/SingleCompetition";
import competitionService from "../services/CompetitionService";

class CompetitionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            competitions: [],
            mainPage: this.props.mainPage
        }
        this.getCompetitions()
        console.log(this.state.competitions)
    }

    getCompetitions = () => {
        competitionService.getCompetitionsRefereedBy(this.state.token).then(result => {
            if (result.status === 200) {
                this.setState({ competitions: [] })
                for (let i=0; i < result.data.length; i++) {
                    let d = result.data[i]
                    this.setState({
                        competitions: [...this.state.competitions, d]
                    });
                }
            }
        })
    }

    render() {
        let competitionListDisplay = this.state.competitions.map((comp) => {
            return(
                <SingleCompetition competition={comp} token={this.state.token} mainPage={this.state.mainPage}/>
            );
        });
        return(
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>Choose</td>
                        <td>Id</td>
                        <td>Admin</td>
                        <td>Participant limit</td>
                        <td>Start Date</td>
                        <td>Type</td>
                        <td>Stages</td>
                        <td>Competitors</td>
                        <td>Referees</td>
                    </tr>
                </thead>
                { this.state.competitions.length === 0 ? this.state.competitions : ""}
                { this.state.competitions.length === 0 ?
                    <tbody><tr><td>Üres</td></tr></tbody> : competitionListDisplay}
            </table>
        );
    }
}

export default CompetitionList;