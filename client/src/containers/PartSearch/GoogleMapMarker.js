import React from 'react';
import FA from './../FA';
import { Card } from 'react-bootstrap';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';

const cardStyle = {
    width: '100px',
    display: 'none',
};

const Marker = (props) => ( // TODO: FIX THIS!
    <div
        className="marker"
        onMouseEnter={() => {
            console.log('enter');
        }}
    >
        <FA
            icon={faMapMarker}
        />
        <Card style={cardStyle}>
            <Card.Body>
                <Card.Title>Title</Card.Title>
                <Card.Text>Text</Card.Text>
            </Card.Body>
        </Card>
    </div>
);

export default Marker;
