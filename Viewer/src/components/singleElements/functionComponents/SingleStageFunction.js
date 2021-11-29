import React from 'react';

const SingleStageFunction = props => {
    return(

            <tr>
                <td>{props.stage.numCompetitorsIn}</td>
                <td>{props.stage.numCompetitorsOut}</td>
                <td>{props.stage.numLegs}</td>
                <td>{props.stage.numCompetitorsPerMatch}</td>
                <td>{props.stage.numTeamsPerGroup}</td>
                <td>{props.stage.pointsForWin}</td>
                <td>{props.stage.pointsForTie}</td>
                <td>{props.stage.pointsForLoss}</td>
            </tr>

    );
}
export default SingleStageFunction