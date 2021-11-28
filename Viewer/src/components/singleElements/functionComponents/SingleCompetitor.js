import React from 'react';

const SingleCompetitor = props => {
    return(
        // eslint-disable-next-line react/jsx-no-undef
        <option>{props.competitor.name}</option>
    );
}
export default SingleCompetitor