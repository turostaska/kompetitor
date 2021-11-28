import Rect, {Component} from 'react';
import SingleCompetitor from "./functionComponents/SingleCompetitor";
import SingleReferee from "./functionComponents/SingleReferee";
import React from "react";
import SingleMatch from "./SingleMatch";

class SingleStage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: props.stage.matches
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
                <td>{this.props.competition.id}</td>
                <td>{this.props.competition.admin.username}</td>
                <td>{this.props.competition.competitorLimit}</td>
                <td>{this.props.competition.startDate}</td>
                <td>{this.props.competition.type}</td>
                <td>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>Order</td>
                                <td>Matches</td>
                            </tr>
                        </thead>
                        <tbody>
                       {/* {this.state.matches.length === 0 ? <tr> <td>No matches to show</td></tr> : singleMatchDisplay}*/}
                        </tbody>
                    </table>
                </td>
                <td>
                    <div className="dropdown">
                        <button className="dropdown-toggle" type="button"
                                data-toggle="dropdown">Competitors
                            <span className="caret"/></button>
                        <ul className="dropdown-menu">
                            {this.props.placeholder.competitors.length === 0 ? <li>"No competitors"</li> : singleCompetitorDisplay}
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

        )
    }
}
export default SingleStage