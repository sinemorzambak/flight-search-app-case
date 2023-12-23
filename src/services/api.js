import axios from "axios";

export const fetchFlights = () => {
  return axios
    .get(`https://mocki.io/v1/6a2d7e71-2490-4b41-8525-3bc355efc795`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching flights data:", error);
      throw error;
    });
};

export const fetchAirports = () => {
  return axios
    .get("https://mocki.io/v1/cf1a6b37-c46e-49f3-8821-59acf680926c")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching airports data:", error);
      throw error;
    });
};

export const fetchSearchFeature = () => {
  return axios
    .get(
      "https://6586f2ad468ef171392f090c.mockapi.io/api/flights/searchFeature"
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching search feature data:", error);
      throw error;
    });
};

export const fetchFilteredFlights = (searchParams) => {
  const {
    departureAirport,
    arrivalAirport,
    departureDate,
    returnDate,
    departureAirportName,
  } = searchParams;

  fetchFlights().then((data) => {
    const filteredFlights = data.filter((flight) => {
      return flight.departure_airport === departureAirportName;
    });
    return filteredFlights;
  });
};
