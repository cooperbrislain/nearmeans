import React from 'react';

const markerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '18px',
    height: '18px',
    backgroundColor: '#000',
    border: '2px solid #fff',
    borderRadius: '100%',
    userSelect: 'none',
    fontSize: '25px',
    transform: 'translate(-50%, -50%)',
    '&:hover': {
        zIndex: 1
    }
};

const Marker = (props) => {
    const { name, text } = props;
    console.log(props);
    return (
        <div className="marker"
             style={ markerStyle }
             title={ name }>
            { text }
        </div>
    );
};

export default Marker;
