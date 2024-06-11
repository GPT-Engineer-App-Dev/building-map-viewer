import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Text } from '@chakra-ui/react';
import L from 'leaflet';

// Define the bounds of Oslo to generate random coordinates
const osloBounds = {
  northEast: { lat: 59.95, lng: 10.76 },
  southWest: { lat: 59.85, lng: 10.52 },
};

// Function to generate random coordinates within Oslo's bounds
const getRandomCoordinates = () => {
  const lat = Math.random() * (osloBounds.northEast.lat - osloBounds.southWest.lat) + osloBounds.southWest.lat;
  const lng = Math.random() * (osloBounds.northEast.lng - osloBounds.southWest.lng) + osloBounds.southWest.lng;
  return [lat, lng];
};

// Generate 10 random building locations
const buildings = Array.from({ length: 10 }, () => ({
  coordinates: getRandomCoordinates(),
  sensorData: {
    temperature: Math.floor(Math.random() * 30),
    humidity: Math.floor(Math.random() * 100),
    occupancy: Math.floor(Math.random() * 500),
  },
}));

// Custom pin icon
const pinIcon = L.icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
  shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const Index = () => {
  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {buildings.map((building, index) => (
        <Marker key={index} position={building.coordinates} icon={pinIcon}>
          <Popup>
            <Box>
              <Text fontWeight="bold">Building {index + 1}</Text>
              <Text>Temperature: {building.sensorData.temperature}°C</Text>
              <Text>Humidity: {building.sensorData.humidity}%</Text>
              <Text>Occupancy: {building.sensorData.occupancy} people</Text>
            </Box>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Index;