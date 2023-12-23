import React from 'react';
import FlightDetails from './FlightDetails';
import { ListGroup } from 'react-bootstrap';

const FlightList = ({ flights }) => {
  return (
    <div>
      <h2>Flight List</h2>
      {flights.length > 0 ? (
        <ListGroup>
          {flights.map((flight) => (
            <ListGroup.Item key={flight.id}>
              <FlightDetails flight={flight} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
};

export default FlightList;
