import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { fetchAirports, fetchFlights } from '../services/api';
import Select from 'react-select';

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
        setAirports(data.availableAirports || []);
      })
      .catch((error) => {
        console.error('Error fetching airports:', error.message);
        setAirports([]);
      });
  }, []);

  const airportOptions = airports
    ? airports.map((airport) => ({
        value: airport.code,
        label: `${airport.name} (${airport.code})`,
      }))
    : [];

    const handleInputChange = (inputValue) => {
        fetchAirports()
          .then((data) => {
            const filteredAirports = data.availableAirports.filter(
              (airport) =>
                airport.name.toLowerCase().includes(inputValue.toLowerCase()) ||
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
    
        const searchParams = {
          departureAirport: departureAirport.value,
          arrivalAirport: arrivalAirport.value,
          departureDate,
          returnDate: oneWay ? null : returnDate,
        };
        onSearch(searchParams);
    
        
        setDepartureAirport(null);
        setArrivalAirport(null);
        setDepartureDate(null);
        setReturnDate(null);
        setOneWay(false);
      };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col>
          <Form.Label>Departure Airport:</Form.Label>
          <Select
            options={airportOptions}
            value={departureAirport}
            onChange={(selectedOption) => setDepartureAirport(selectedOption)}
            onInputChange={handleInputChange}
            isSearchable
            placeholder="Select departure airport"
          />
        </Col>
        <Col>
          <Form.Label>Arrival Airport:</Form.Label>
          <Select
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
          <Form.Label>Departure Date:</Form.Label>
          <DatePicker selected={departureDate} onChange={(date) => setDepartureDate(date)} className="form-control" />
        </Col>
        <Col>
          <Form.Label>Return Date:</Form.Label>
          <DatePicker
            selected={returnDate}
            onChange={(date) => setReturnDate(date)}
            disabled={oneWay}
            className="form-control"
          />
        </Col>
      </Row>

      <Form.Check type="checkbox" label="One Way" checked={oneWay} onChange={() => setOneWay(!oneWay)} className="mb-3" />

      <Button type="submit" variant="primary">
        Search
      </Button>
    </Form>
  );
};

export default FlightSearchForm;
