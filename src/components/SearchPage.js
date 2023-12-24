
import React, { useState } from 'react';
import FlightSearchForm from './FlightSearchForm';
import FlightList from './FlightList';
import { fetchFilteredFlights, fetchFlights } from '../services/api';
import ErrorPage from './ErrorPage';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (searchParams) => {
    setLoading(true);
    setError(null);

    fetchFlights(searchParams)
      .then((data) => { 
        const filteredFlights = data.filter((flight) => {
            return flight.departure_airport === searchParams.departureAirportName;
          });
        console.log("sinem", data);
        setFlights(filteredFlights);
      })
      .catch((error) => {
        setError('Error fetching flights. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <header>
        <h3>Flight Search App</h3>
      </header>
      <main>
        <FlightSearchForm onSearch={handleSearch} />
        {loading && <p>Loading...</p>}
        {error && <ErrorPage message={error} />}
        {flights.length > 0 && <FlightList flights={flights} />}
      </main>
    </div>
  );
};

export default SearchPage;
