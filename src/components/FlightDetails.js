import React from 'react';

const FlightDetails = ({ flight }) => {
  return (
    <div>
      <h3>{flight.airline} - {flight.city}</h3>
      <p>Departure Time: {flight.departure_time}</p>
      <p>Arrival Time: {flight.arrival_time}</p>
      <p>Flight Duration: {flight.flight_time}</p>
      <p>Price: {flight.price}</p>
      
    </div>
  );
};

export default FlightDetails;
