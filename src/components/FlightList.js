
import React, { useState, useEffect } from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';
import FlightDetails from './FlightDetails';
import '../styles/FlightList.css';

const FlightList = ({ flights }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h4 className="flight-list-title">Flight List</h4>
      {loading ? (
        <div className="loading-container">
          <BeatLoader color="#3498db" loading={loading} css={loaderStyle} size={15} />
          <p>Loading...</p>
        </div>
      ) : flights.length > 0 ? (
        <Card className="flight-list-card">
          <ListGroup variant="flush">
            {flights.map((flight) => (
              <ListGroup.Item key={flight.id}>
                <FlightDetails flight={flight} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
};

const loaderStyle = css`
  margin: 10px auto;
`;

export default FlightList;
