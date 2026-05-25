import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const projects = [
  { id: 1, name: "NOXH Nam cầu Cẩm Lệ", lat: 16.0556, lng: 108.2123, price: "20.68 tr/m²", units: 849 },
  { id: 2, name: "NOXH Hòa Xuân", lat: 16.0145, lng: 108.1789, price: "19.5 tr/m²", units: 1300 },
  { id: 3, name: "NOXH Ngũ Hành Sơn", lat: 16.0011, lng: 108.2511, price: "22.5 tr/m²", units: 420 },
  { id: 4, name: "NOXH Liên Chiểu", lat: 16.0789, lng: 108.1456, price: "19.8 tr/m²", units: 580 },
  { id: 5, name: "NOXH Điện Bàn", lat: 15.9833, lng: 108.1667, price: "18.2 tr/m²", units: 650 },
]

export default function App() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="w-full h-screen relative">
      {/* Header */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur rounded-2xl p-5 shadow-xl max-w-sm">
        <h1 className="font-bold text-xl text-blue-900">🗺️ Bản Đồ NOXH Đà Nẵng 2026</h1>
        <p className="text-sm text-gray-600 mt-2">
          ✅ 94 đơn vị hành chính<br/>
          ✅ 46 khu đất NOXH<br/>
          ✅ 42,700 căn hộ quy hoạch
        </p>
        <p className="text-xs text-gray-500 mt-3">👉 Click vào marker để xem chi tiết</p>
      </div>

      {/* Map */}
      <MapContainer center={[16.0544, 108.2022]} zoom={12} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {projects.map(p => (
          <Marker 
            key={p.id} 
            position={[p.lat, p.lng]}
            eventHandlers={{ click: () => setSelected(p) }}
          >
            <Popup>
              <div className="text-sm">
                <b className="text-blue-900">{p.name}</b><br/>
                <span className="text-amber-600 font-semibold">{p.price}</span><br/>
                {p.units} căn hộ
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Detail Panel */}
      {selected && (
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white rounded-2xl p-6 shadow-2xl z-[1000] animate-fade-in">
          <div className="flex justify-between items-start mb-3">
            <h2 className="font-bold text-xl text-blue-900">{selected.name}</h2>
            <button 
              onClick={() => setSelected(null)} 
              className="text-gray-400 hover:text-red-500 text-2xl transition"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2 text-sm text-gray-700 mb-4">
            <p>💰 <strong>Giá bán:</strong> {selected.price}</p>
            <p>🏠 <strong>Tổng số căn:</strong> {selected.units}</p>
            <p>📍 <strong>Vị trí:</strong> {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}</p>
            <p>🏗️ <strong>Hoàn thành:</strong> 2027-2028</p>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl transition shadow-lg">
              📞 Liên hệ ngay
            </button>
            <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-3 rounded-xl transition">
              ℹ️ Xem chi tiết
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
