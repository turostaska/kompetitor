import React, {Component} from 'react';
import SingleCompetition from "./singleElements/SingleCompetition";

class CompetitionList extends  Component {
    constructor() {
        super();
        this.state = {
            competitions: [],
        }
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
                        <td></td>
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
                <tbody>
                { this.state.competitions.length === 0 ? "" : competitionListDisplay}
                </tbody>
            </table>
        );
    }
}

export default CompetitionList;