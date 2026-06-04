import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import Card from '../ui/Card'
import { vehicles } from '../../data/mockData'

const createStatusIcon = (status) => {
  const color = status === 'moving' ? 'var(--primary)' : status === 'idle' ? 'var(--warning)' : 'var(--error)';
  
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        width: 12px;
        height: 12px;
        background-color: ${color};
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 6px ${color};
      "></div>
    `,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

export default function FleetMapStatic() {
  const defaultCenter = [-0.5, 117.14];

  return (
    <Card noPadding>
      <div className="p-5 pb-4">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">Fleet Status Map</div>
          <div className="flex items-center gap-4 text-[10px] text-[var(--muted)]">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--primary)]" />Active</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--warning)]" />Idle</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--error)]" />Alert</span>
          </div>
        </div>
      </div>
      <div className="h-64 border-t border-[var(--border)] overflow-hidden relative z-0">
        <MapContainer 
          center={defaultCenter} 
          zoom={10} 
          scrollWheelZoom={false}
          dragging={false}
          zoomControl={false}
          doubleClickZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution=''
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          />
          
          {vehicles.map((v) => {
            if (!v.lat || !v.lng) return null;
            return (
              <Marker key={v.id} position={[v.lat, v.lng]} icon={createStatusIcon(v.status)} />
            );
          })}
        </MapContainer>
        {/* Overlay to absolutely block interactions just in case */}
        <div className="absolute inset-0 z-[1000] bg-transparent" />
      </div>
    </Card>
  )
}
