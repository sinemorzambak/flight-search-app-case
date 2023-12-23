
const mockData = [
    {
      id: 1,
      airline: 'Lufthansa',
      city: 'Berlin',
      departureTime: '12:00 PM',
      arrivalTime: '02:00 PM',
      duration: '2h',
      price: '$200',
    },
    {
      id: 2,
      airline: 'Turkish Airlines',
      city: 'Istanbul',
      departureTime: '03:00 PM',
      arrivalTime: '05:00 PM',
      duration: '2h',
      price: '$250',
    },
    {
      id: 3,
      airline: 'Emirates',
      city: 'Dubai',
      departureTime: '08:00 AM',
      arrivalTime: '02:00 PM',
      duration: '6h',
      price: '$500',
    },
    {
      id: 4,
      airline: 'Delta Airlines',
      city: 'New York',
      departureTime: '09:00 AM',
      arrivalTime: '02:00 PM',
      duration: '7h',
      price: '$450',
    },
    {
      id: 5,
      airline: 'British Airways',
      city: 'London',
      departureTime: '11:00 AM',
      arrivalTime: '03:00 PM',
      duration: '4h',
      price: '$300',
    },
    {
      id: 6,
      airline: 'Air France',
      city: 'Paris',
      departureTime: '10:00 AM',
      arrivalTime: '02:00 PM',
      duration: '3h',
      price: '$350',
    },
    
    
    {
      id: 50,
      airline: 'Qatar Airways',
      city: 'Doha',
      departureTime: '01:00 PM',
      arrivalTime: '07:00 PM',
      duration: '6h',
      price: '$400',
    },
  ];
  
  export const fetchFlights = (searchParams) => {
    
    return new Promise((resolve) => {
      
      setTimeout(() => {
        
        resolve(mockData);
      }, 1000);
    });
  };
  
  export const fetchAirports = () => {
    return new Promise((resolve) => {
      
      resolve([
        { code: 'IST', name: 'Istanbul Airport' },
        { code: 'SFO', name: 'San Francisco International Airport' },
        { code: 'JFK', name: 'John F. Kennedy International Airport' },
        { code: 'LHR', name: 'Heathrow Airport' },
        { code: 'DXB', name: 'Dubai International Airport' },
        { code: 'CDG', name: 'Charles de Gaulle Airport' },
        { code: 'HND', name: 'Haneda Airport' },
        { code: 'PEK', name: 'Beijing Capital International Airport' },
        
      ]);
    });
  };
  