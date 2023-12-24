import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Form, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import { fetchAirports, fetchFlights } from '../services/api';
import '../styles/FlightSearchForm.css';

const FlightSearchForm = ({ onSearch }) => {
  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [oneWay, setOneWay] = useState(false);
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState(false); 

  useEffect(() => {
    fetchAirports()
      .then((data) => {
        setAirports(data);
      })
      .catch((error) => {
        console.error('Error fetching airports:', error.message);
        setAirports([]);
      });
  }, []);

  const airportOptions = airports
    ? airports.map((airport) => ({
        value: airport.code,
        label: `${airport.airport} (${airport.code})`,
        name: airport.airport,
      }))
    : [];

  const handleInputChange = (inputValue) => {
    fetchAirports()
      .then((data) => {
        const filteredAirports = data.filter(
          (airport) =>
            airport.airport.toLowerCase().includes(inputValue.toLowerCase()) ||
            airport.code.toLowerCase().includes(inputValue.toLowerCase())
        );
        setAirports(filteredAirports);
      })
      .catch((error) => {
        console.error('Error fetching airports:', error.message);
        setAirports([]);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!departureAirport || !arrivalAirport || !departureDate || (!oneWay && !returnDate)) {
      setError(true); 
      return;
    }

    const searchParams = {
      departureAirport: departureAirport.value,
      arrivalAirport: arrivalAirport.value,
      departureDate,
      returnDate: oneWay ? null : returnDate,
      departureAirportName: departureAirport.name,
    };
    onSearch(searchParams);

    setDepartureAirport(null);
    setArrivalAirport(null);
    setDepartureDate(null);
    setReturnDate(null);
    setOneWay(false);
    setError(false); 
  };

  return (
    <div className="form-container">
      {error && <div className="error-message">Lütfen tüm alanları doldurun.</div>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label className="form-label">Departure Airport:</Form.Label>
            <Select
              className={`select-container ${error && !departureAirport ? 'is-invalid' : ''}`}
              options={airportOptions}
              value={departureAirport}
              onChange={(selectedOption) => setDepartureAirport(selectedOption)}
              onInputChange={handleInputChange}
              isSearchable
              placeholder="Select departure airport"
            />
            {error && !departureAirport && (
              <div className="invalid-feedback">Departure airport is required.</div>
            )}
          </Col>
          <Col>
            <Form.Label className="form-label">Arrival Airport:</Form.Label>
            <Select
              className={`select-container ${error && !arrivalAirport ? 'is-invalid' : ''}`}
              options={airportOptions}
              value={arrivalAirport}
              onChange={(selectedOption) => setArrivalAirport(selectedOption)}
              onInputChange={handleInputChange}
              isSearchable
              placeholder="Select arrival airport"
            />
            {error && !arrivalAirport && (
              <div className="invalid-feedback">Arrival airport is required.</div>
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label className="form-label">Departure Date:</Form.Label>
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              className={`form-control date-picker-container ${error && !departureDate ? 'is-invalid' : ''}`}
            />
            {error && !departureDate && (
              <div className="invalid-feedback">Departure date is required.</div>
            )}
          </Col>
          <Col>
            <Form.Label className="form-label">Return Date:</Form.Label>
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              disabled={oneWay}
              className={`form-control date-picker-container ${error && !returnDate ? 'is-invalid' : ''}`}
            />
            {error && !returnDate && (
              <div className="invalid-feedback">Return date is required.</div>
            )}
          </Col>
        </Row>

        <div className="checkbox-container">
          <Form.Check
            type="checkbox"
            label="One Way"
            checked={oneWay}
            onChange={() => setOneWay(!oneWay)}
            className="checkbox-label"
          />
        </div>

        <Button type="submit" variant="primary" className="submit-button">
          Search Flights
        </Button>
      </Form>
    </div>
  );
};

export default FlightSearchForm;
