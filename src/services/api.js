import axios from 'axios';

export const fetchFlights = (searchParams) => {
  const { departureAirport, arrivalAirport, departureDate, returnDate } = searchParams;

  return axios.get(`https://6586f2ad468ef171392f090c.mockapi.io/api/flights?departureAirport=${departureAirport}&arrivalAirport=${arrivalAirport}&departureDate=${departureDate}&returnDate=${returnDate}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching flights data:', error);
      throw error;
    });
};

export const fetchAirports = () => {
  return axios.get('https://6586f2ad468ef171392f090c.mockapi.io/api/airports')
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching airports data:', error);
      throw error;
    });
};

export const fetchSearchFeature = () => {
  return axios.get('https://6586f2ad468ef171392f090c.mockapi.io/api/flights/searchFeature')
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching search feature data:', error);
      throw error;
    });
};
