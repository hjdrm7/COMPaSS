import { useEffect } from 'react'
import { Circle, MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
const icon = L.divIcon({ className: 'map-pin', html: '●', iconSize: [24,24], iconAnchor:[12,12] })
function Pin({ value, onChange }) { useMapEvents({ click(e) { onChange({ lat:e.latlng.lat, lng:e.latlng.lng }) } }); return value ? <Marker position={value} icon={icon} draggable eventHandlers={{ dragend:e => onChange(e.target.getLatLng()) }} /> : null }
export default function MapPicker({ value, onChange, height='240px', circles=[] }) { const base=[8.4858,123.8044]; return <MapContainer center={value || base} zoom={15} style={{height}} className="map" aria-label="Incident location map"><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/><Pin value={value} onChange={onChange}/>{circles.map((c,i)=><Circle key={i} center={c.center} radius={c.radius} pathOptions={{color:'#e66136'}} />)}</MapContainer> }
