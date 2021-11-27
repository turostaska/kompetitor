import React, {Component} from 'react';

class SingleCompetition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            stages: this.props.competition.stages,
        }
    }

    render(){
        let singleStateDsiplay = this.state.stages.map((stage) => {
   //         <SingleStage></SingleStage>
        })
        return(
            <tr>

            </tr>
     //   {(this.state.open ===false || this.stages.length === 0) ? "" : }
        )
    }
}

export default SingleCompetition