import { useState } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import markerIcon from './image/images.png'

function App() {

  const [address, setAddress] = useState('')
  const [location, setLocation] = useState(null)
  const [errors, setErrors] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.get(`http://localhost:4100/api/search?address=${address}`)
      setLocation(response.data)

    } catch(err){
      console.log(err)
      setErrors(err.response.data.errors)
    }
  }

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });


  return (
    <div>
      <h2>Address Locator</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='location'>Enter address</label><br/>
        <input 
        type='text'
        id='location'
        value={address}
        onChange={(e) => setAddress(e.target.value)}/><br/>
        <input type='submit'/>
      </form><br/>
      {/* {error && <p>{error}</p>} */}
      {location && (
        <MapContainer style={{ height: '50vh', width: '50%', margin: 'auto' }} center={[location.position.lat, location.position.lng]} zoom={13}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.position.lat, location.position.lng]} icon={customIcon}>
            <Popup>{location.address}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default App;
