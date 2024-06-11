import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Text, VStack } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Dummy data for sensor readings
const sensorData = [
  { id: 1, temperature: '20°C', humidity: '30%', co2: '400ppm' },
  { id: 2, temperature: '22°C', humidity: '25%', co2: '410ppm' },
  { id: 3, temperature: '19°C', humidity: '35%', co2: '420ppm' },
  { id: 4, temperature: '21°C', humidity: '40%', co2: '430ppm' },
  { id: 5, temperature: '18°C', humidity: '32%', co2: '440ppm' },
  { id: 6, temperature: '23°C', humidity: '28%', co2: '450ppm' },
  { id: 7, temperature: '17°C', humidity: '37%', co2: '460ppm' },
  { id: 8, temperature: '24°C', humidity: '33%', co2: '470ppm' },
  { id: 9, temperature: '16°C', humidity: '31%', co2: '480ppm' },
  { id: 10, temperature: '25°C', humidity: '29%', co2: '490ppm' },
];

// Function to generate random coordinates within Oslo's geographical bounds
const generateRandomCoordinates = () => {
  const osloBounds = {
    latMin: 59.8,
    latMax: 60.0,
    lngMin: 10.6,
    lngMax: 10.9,
  };
  return {
    lat: Math.random() * (osloBounds.latMax - osloBounds.latMin) + osloBounds.latMin,
    lng: Math.random() * (osloBounds.lngMax - osloBounds.lngMin) + osloBounds.lngMin,
  };
};

// Custom icon for the markers
const customIcon = new L.Icon({
  iconUrl: require('../assets/marker-icon.png'),
  iconRetinaUrl: require('../assets/marker-icon-2x.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require('../assets/marker-shadow.png'),
  shadowSize: [41, 41]
});

const Index = () => {
  const [markers, setMarkers] = useState(Array.from({ length: 10 }, () => generateRandomCoordinates()));

  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((position, idx) => (
        <Marker key={idx} position={position} icon={customIcon}>
          <Popup>
            <VStack>
              <Text fontWeight="bold">Building {sensorData[idx].id}</Text>
              <Box>
                <Text>Temperature: {sensorData[idx].temperature}</Text>
                <Text>Humidity: {sensorData[idx].humidity}</Text>
                <Text>CO2 Levels: {sensorData[idx].co2}</Text>
              </Box>
            </VStack>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Index;