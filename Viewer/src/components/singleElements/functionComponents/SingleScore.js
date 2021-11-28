import React from 'react';

const SingleScore = props => {
    return(
        <tr>
            <td>{props.placeholder.id}. match</td>
            <td>{props.score.getName()}</td>
            <td>{props.score.getScore()}</td>
            <td>{props.placeholder.concluded.toString()}</td>
        </tr>
    );
}
export default SingleScore