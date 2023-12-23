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
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    console.log(departureAirport);

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
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label className="form-label">Departure Airport:</Form.Label>
            <Select
              className="select-container"
              options={airportOptions}
              value={departureAirport}
              onChange={(selectedOption) => setDepartureAirport(selectedOption)}
              onInputChange={handleInputChange}
              isSearchable
              placeholder="Select departure airport"
            />
          </Col>
          <Col>
            <Form.Label className="form-label">Arrival Airport:</Form.Label>
            <Select
              className="select-container"
              options={airportOptions}
              value={arrivalAirport}
              onChange={(selectedOption) => setArrivalAirport(selectedOption)}
              onInputChange={handleInputChange}
              isSearchable
              placeholder="Select arrival airport"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label className="form-label">Departure Date:</Form.Label>
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              className="form-control date-picker-container"
            />
          </Col>
          <Col>
            <Form.Label className="form-label">Return Date:</Form.Label>
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              disabled={oneWay}
              className="form-control date-picker-container"
            />
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
          <Button
            variant="primary"
            className={`btn-one-way ${oneWay ? 'active' : ''}`}
            onClick={() => setOneWay(!oneWay)}
          >
            One Way
          </Button>
        </div>

        <Button type="submit" variant="primary" className="submit-button">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default FlightSearchForm;
