import React from 'react';

const Marker = (props) => (
    <div className="marker">
        <h5>{ props.name }</h5>
        <div>
            { props.children }
        </div>
    </div>
);

export default Marker;
