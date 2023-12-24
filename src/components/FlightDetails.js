import React from 'react';
import { Card } from 'react-bootstrap';
import { FaPlaneDeparture, FaPlaneArrival, FaClock, FaMoneyBillAlt } from 'react-icons/fa';
import '../styles/FlightDetails.css';

const FlightDetails = ({ flight }) => {
  return (
    <Card className="flight-details-card">
      <Card.Header className="airline-title">{flight.airline}</Card.Header>
      <Card.Body>
        <Card.Text className="flight-info">
          <p>
            <FaPlaneDeparture className="icon" /> Departure Time: {flight.departure_time}
          </p>
          <p>
            <FaPlaneArrival className="icon" /> Arrival Time: {flight.arrival_time}
          </p>
          <p>
            <FaClock className="icon" /> Flight Duration: {flight.flight_time} hours
          </p>
          <p>
            <FaMoneyBillAlt className="icon" /> Price: ${flight.price}
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FlightDetails;
