import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Card from '../ui/Card'

// Function to create a custom divIcon for markers
const createCustomIcon = (fuelLevel) => {
  const color = fuelLevel > 80 ? '#1abc9c' : fuelLevel > 30 ? '#f39c12' : '#e74c3c';
  
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        width: 16px;
        height: 16px;
        background-color: ${color};
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.4);
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

export default function FleetMap({ vehicles = [] }) {
  // Center map on East Kalimantan (Samarinda)
  const defaultCenter = [-0.5, 117.14];

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-xs text-[var(--muted)] uppercase">LIVE FLEET TRACKING</div>
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <span className="h-2 w-2 rounded-full bg-[var(--success)] animate-pulse" />
          Real-time GPS telemetry active
        </div>
      </div>

      <div className="mt-3 h-96 w-full overflow-hidden rounded-md border border-[var(--border)] z-0">
        <MapContainer center={defaultCenter} zoom={10} scrollWheelZoom={true} className="h-full w-full z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {vehicles.map((v) => {
            // Use provided coordinates, fallback to default if missing
            const position = v.lat && v.lng ? [v.lat, v.lng] : null;
            if (!position) return null;

            return (
              <Marker key={v.id} position={position} icon={createCustomIcon(v.fuelLevel)}>
                <Popup>
                  <div className="text-sm">
                    <strong>{v.id}</strong><br />
                    Plate: {v.plateNumber}<br />
                    Fuel: {v.fuelLevel}%<br />
                    Status: <span className="capitalize">{v.status}</span>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </Card>
  )
}
