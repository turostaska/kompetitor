import React, {Component} from 'react'
import StageViewDTO from "../../DTOs/StageViewDTO";

class StageGroup extends Component {
    constructor(props) {
        super();
        this.state={
            competitorsIn: 0,
            competitorsOut: 0,
            numOfLegs: 0,
            numCompetitorPerGroup: 0,
            pointsForWin: 0 ,
            pointsForTie: 0 ,
            pointsForLoss: 0
        }
    }

    onCreateStage = () => {
        if(this.state.competitorsIn > 1 && this.state.competitorsOut >0 && this.state.numOfLegs >0 && this.state.numCompetitorPerGroup > 0 &&
                this.state.pointsForWin > 0) {
            let stage = new StageViewDTO("GROUP", this.state.competitorsIn, this.state.competitorsOut, "", this.state.numOfLegs,
                this.state.numCompetitorPerGroup, this.state.pointsForWin, this.state.pointsForTie, this.state.pointsForLoss);
            this.props.add(stage);
        }
    }

    onCompetitorsInChange = async(e) => {
        await this.setState({competitorsIn: e.target.value})
    }
    onCompetitorsOutChange = async(e) => {
        await this.setState({competitorsOut: e.target.value})
    }
    onNumOfLegsChange = e => {
        this.setState({numOfLegs: e.target.value})
    }
    onCompetitorPerGroupChange = e => {
        this.setState({numCompetitorPerGroup: e.target.value})
    }
    onPointsForWinChange = e => {
        this.setState({pointsForWin: e.target.value})
    }
    onPointsForTieChange = e => {
        this.setState({pointsForTie: e.target.value})
    }
    onPointsForLossChange = e => {
        this.setState({pointsForLoss: e.target.value})
    }

    render() {
        return (
            <div>
                <label id='competititors_in'>Number of competitors entering this stage: </label>
                <input type='number' id="competitorsOut" min="2" value={this.state.competitorsIn} onChange={this.onCompetitorsInChange}/>
                <br/>
                <label id='competititors_out'>Number of competitors leaving this stage: </label>
                <input type='number' id="competitorsOut" min="2" value={this.state.competitorsOut} onChange={this.onCompetitorsOutChange}/>
                <br/>
                <label id='num_legs'>Number of legs: </label>
                <input type='number' id="numLegs" min="2" value={this.state.numOfLegs} onChange={this.onNumOfLegsChange}/>
                <br/>
                <label id='num_legs'>Competitors per group: </label>
                <input type='number' id="numLegs" min="2" value={this.state.numCompetitorPerGroup} onChange={this.onCompetitorPerGroupChange}/>
                <br/>
                <label id='num_legs'>Points to win: </label>
                <input type='number' id="numLegs" min="2" value={this.state.pointsForWin} onChange={this.onPointsForWinChange}/>
                <br/>
                <label id='num_legs'>Points for tie: </label>
                <input type='number' id="numLegs" min="2" value={this.state.pointsForTie} onChange={this.onPointsForTieChange}/>
                <br/>
                <label id='num_legs'>Points for loss: </label>
                <input type='number' id="numLegs" min="2" value={this.state.pointsForLoss} onChange={this.onPointsForLossChange}/>
                <br/>
                <button onClick={this.onCreateStage}>Create Stage</button>
            </div>
        );
    }


}
export default StageGroup