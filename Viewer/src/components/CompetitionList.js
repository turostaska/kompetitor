import React, {Component} from 'react';
import SingleCompetition from "./singleElements/SingleCompetition";
import NewCompetitionService from "../services/CompetitionService";

class CompetitionList extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            competitions: [],
        }
        this.loadCompetitions();
    }



    loadCompetitions = () => {
        NewCompetitionService.getAllCompetitions(this.props.token).then(result => {
            if (result.status === 200) {
                for (var i = 0; i < result.data.length; i++) {
                    if(i === 0)
                        this.setState({
                            competitions: [result.data[i]]
                        });
                    else
                        this.setState({
                            competitions: [...this.state.competitions, result.data[i]]
                        });
                }
            }
        });
    }

    render(){
        let competitionListDisplay = this.state.competitions.map((comp) => {
            return(
                <SingleCompetition competition={comp} />
            );
        });
        return(
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td> </td>
                        <td>Extend</td>
                        <td>Admin</td>
                        <td>Participant limit</td>
                        <td>Start Date</td>
                        <td>Type</td>
                        <td>Stages</td>
                        <td>Competitors</td>
                        <td>Referees</td>
                    </tr>
                </thead>
                { this.state.competitions.length === 0 ? "" : competitionListDisplay}
            </table>
        );
    }
}

export default CompetitionList;