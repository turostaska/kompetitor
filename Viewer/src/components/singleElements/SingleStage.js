import Rect, {Component} from 'react';
import SingleCompetitor from "./functionComponents/SingleCompetitor";
import SingleReferee from "./functionComponents/SingleReferee";
import React from "react";
import SingleMatch from "./SingleMatch";

class SingleStage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: this.props.stage.matches
        }
    }
    render(){
        let singleCompetitorDisplay = this.props.placeholder.competitors.map((com) => {
            return( <SingleCompetitor competitor={com} />);
        });
        let singleRefereeDisplay = this.props.placeholder.referees.map((ref) => {
            return( <SingleReferee referee={ref}/> );
        });
        let singleMatchDisplay = this.state.matches.map((m) => {
            return ( <SingleMatch match={m} placeholder={this.props.stage.id}/> );
        })
        return(
            <tr>
                <td> </td>
                <td> </td>
                <td>{this.props.placeholder.admin.username}</td>
                <td>{this.props.placeholder.competitorLimit}</td>
                <td>{this.props.placeholder.startDate}</td>
                <td>{this.props.placeholder.type}</td>
                <td>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>Order</td>
                                <td>Matches</td>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.matches.length === 0 ? <tr> <td>No matches to show</td></tr> : singleMatchDisplay}
                        </tbody>
                    </table>
                </td>
                <td>
                    <select value="Competitors">
                        <option>Competitors</option>
                        {this.props.placeholder.competitors.length === 0 ? <option>"No competitors"</option> : singleCompetitorDisplay}
                    </select>
                </td>
                <td>
                    <select value="Referees">
                        <option>Referees</option>
                        {this.props.placeholder.referees.length === 0 ? <option>"No referees"</option> : singleRefereeDisplay}
                    </select>
                </td>
            </tr>

        )
    }
}
export default SingleStage