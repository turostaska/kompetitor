import React from 'react';

const SingleReferee = props => {
    return(
        <option> {props.referee.username} </option>
    );
}
export default SingleReferee