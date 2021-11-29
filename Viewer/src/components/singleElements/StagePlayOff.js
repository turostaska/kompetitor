import React, {Component} from 'react'
import StageViewDTO from "../../DTOs/StageViewDTO";

class StagePlayOff extends Component {
    constructor(props) {
        super();
        this.state={
            competitorsIn: 0,
            competitorsOut: 0,
            numOfLegs: 0,
        }
    }

    onCreateStage = () => {
        if(this.state.competitorsIn > 1 && this.state.competitorsOut >0 && this.state.numOfLegs >0) {
            let stage = new StageViewDTO("PLAYOFF", this.state.competitorsIn, this.state.competitorsOut, null, this.state.numOfLegs);
            this.props.add(stage);
        }
    }

    render() {
        return (
            <div>
                <label id='competititors_in'>Number of competitors entering this stage: </label>
                <input type='number' id="competitorsOut" min="2" value={this.state.competitorLimit} onChange={this.onCompetitorLimitChange}/>
                <br/>
                <label id='competititors_out'>Number of competitors leaving this stage: </label>
                <input type='number' id="competitorsOut" min="2" value={this.state.competitorLimit} onChange={this.onCompetitorLimitChange}/>
                <br/>
                <label id='num_legs'>Player limit: </label>
                <input type='number' id="numLegs" min="2" value={this.state.competitorLimit} onChange={this.onCompetitorLimitChange}/>
                <br/>
                <button onClick={this.onCreateStage}>Create Stage</button>
            </div>
        );
    }
}
export default StagePlayOff