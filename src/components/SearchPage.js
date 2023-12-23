
import React, { useState } from 'react';
import FlightSearchForm from './FlightSearchForm';
import FlightList from './FlightList';
import { fetchFlights } from '../services/api';
import ErrorPage from './ErrorPage';

const SearchPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (searchParams) => {
    setLoading(true);
    setError(null);

    fetchFlights(searchParams)
      .then((data) => {
        setFlights(data);
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
        <h1>Flight Search App</h1>
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
