// src/components/pages/Reportes.js
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Reportes = () => {
    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Revenue',
                data: [1, 2, 1, 3, 4, 3],
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const doughnutData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Reportes Dashboard</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Bar Chart</h2>
                    <Bar data={barData} />
                </div>
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Line Chart</h2>
                    <Line data={lineData} />
                </div>
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Doughnut Chart</h2>
                    <Doughnut data={doughnutData} />
                </div>
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-2">World Map</h2>
                    <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: '400px' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Reportes;
