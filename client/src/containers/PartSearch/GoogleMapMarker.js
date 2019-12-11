import React from 'react';

const Marker = (props) => {
    const { name, text } = props;
    return (
        <div className="marker">
            <h5>{ name }</h5>
            <div>{ text }</div>
        </div>
    );
};

export default Marker;
