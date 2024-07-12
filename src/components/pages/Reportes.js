import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Reportes = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/reports')
            .then(response => {
                setReports(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the reports!', error);
            });
    }, []);

    const renderChart = (report) => {
        const labels = JSON.parse(report.labels);
        const data = JSON.parse(report.data);
        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: report.type === 'bar' ? 'Sales' : report.type === 'line' ? 'Revenue' : '',
                    data: data,
                    backgroundColor: report.type === 'doughnut' ? ['#FF6384', '#36A2EB', '#FFCE56'] : 'rgba(75, 192, 192, 0.6)',
                    /*    borderColor: report.type === 'line' ? 'rgba(75, 192, 192, 1)' : '', */
                    /*   fill: report.type !== 'line', */
                }
            ],
        };

        switch (report.type) {
            case 'bar':
                return <Bar data={chartData} />;
            case 'line':
                return <Line data={chartData} />;
            case 'doughnut':
                return <Doughnut data={chartData} />;
            default:
                return null;
        }
    };

    const peruLocations = [
        { position: [-12.0464, -77.0428], name: 'Lima' },
        { position: [-13.5319, -71.9675], name: 'Cusco' },
        { position: [-16.4090, -71.5375], name: 'Arequipa' },
        { position: [-6.4881, -76.3653], name: 'Tarapoto' },
        { position: [-3.7491, -73.2538], name: 'Iquitos' }
    ];

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Reportes Dashboard</h1>
            <div className="grid grid-cols-2 gap-4">
                {reports.map(report => (
                    <div key={report.id} className="bg-white dark:bg-darkCard p-4 shadow-md rounded-lg">
                        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{report.type.charAt(0).toUpperCase() + report.type.slice(1)} Chart</h2>
                        {renderChart(report)}
                    </div>
                ))}
                <div className="bg-white dark:bg-darkCard p-4 shadow-md rounded-lg col-span-2">
                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">World Map</h2>
                    <MapContainer center={[-9.19, -75.0152]} zoom={5} style={{ height: '400px' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {peruLocations.map((location, index) => (
                            <Marker key={index} position={location.position}>
                                <Popup>{location.name}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Reportes;
