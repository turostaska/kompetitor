import React from 'react';

const SingleScore = props => {
    return(
        <tr>
            <td>{props.score.getName()}</td>
            <td>{props.score.getScore()}</td>
        </tr>
    );
}
export default SingleScore