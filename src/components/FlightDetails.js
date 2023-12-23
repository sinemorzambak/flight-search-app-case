import React from 'react';

const FlightDetails = ({ flight }) => {
  return (
    <div>
      <h3>{flight.airline} - {flight.city}</h3>
      <p>Departure Time: {flight.departureTime}</p>
      <p>Arrival Time: {flight.arrivalTime}</p>
      <p>Flight Duration: {flight.duration}</p>
      <p>Price: {flight.price}</p>
      
    </div>
  );
};

export default FlightDetails;
