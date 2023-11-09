import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Icon } from "leaflet";
import pin from "../assets/pin.svg";
function TransportDashboard() {
  const [isALineSelected, setIsALineSelected] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const center = [-34.589803, -58.460838];
  const OptionsArr = [
    { name: "7B", code: 1608 },
    { name: "7B", code: 1609 },
    { name: "12A", code: 1745 },
    { name: "26A", code: 2029 },
    { name: "57D x Ruta 7 Palermo Lujan", code: 384 },
    { name: "164B Burzaco x Garibaldi", code: 1801 },
    { name: "159C L (Roja) Correo Central", code: 839 },
    { name: "188A", code: 114 },
    { name: "133D Est. Transf. Vte. López", code: 1724 },
    { name: "133A Barracas", code: 1719 },
    { name: "148A 2 - Pque. Avellaneda x Guillermo Marconi", code: 1980 },
    { name: "148B", code: 1635 },
    { name: "153A", code: 1468 },
    { name: "253A", code: 1464 },
    { name: "253A", code: 1465 },
    { name: "321A", code: 1466 },
    { name: "321A", code: 1467 },
  ];

  const customIcon = new Icon({
    iconUrl: pin,
    iconSize: [32, 32], // Set the size of the icon (width, height)
  });

  async function fetchTransportData() {
    try {
      const apiUrl = `https://datosabiertos-transporte-apis.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?route_id=${isALineSelected}&client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6`;

      const response = await fetch(apiUrl, { mode: "cors" }); // Make the fetch request
      if (!response.ok) {
        throw new Error("Network response was not ok"); // Handle non-2xx responses
      }

      const data = await response.json(); // Parse the response as JSON

      setSelectedLine(data);
      // Process the data or return it
      console.log("Transport data:", data);
      return data;
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  useEffect(() => {
    let timeoutId;

    const fetchDataPeriodically = () => {
      if (isALineSelected) {
        // Execute your function here
        fetchTransportData();

        // Set a timeout to run the function again in 31 seconds
        timeoutId = setTimeout(fetchDataPeriodically, 31000);
      }
    };

    // Initial execution of the function
    fetchDataPeriodically();

    // Cleanup function
    return () => {
      // Clear the timeout when the component unmounts
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isALineSelected]);

  return (
    <section
      id="transport-dashboard"
      onChange={(e) => {
        console.log(e.target.value);
        setIsALineSelected(e.target.value);
      }}
    >
      <div className="search">
        <label>Linea de colectivo:</label>
        <select>
          <option value="" selected disabled>
            Seleciona una linea
          </option>
          {OptionsArr.map((line) => (
            <option value={line.code}>{line.name}</option>
          ))}
        </select>
      </div>

      <MapContainer center={center} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedLine?.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.latitude, marker.longitude]}
            icon={customIcon}
          >
            <Popup>
              <p>{marker.route_short_name}</p>
              <p>{marker.speed} km/h</p>
              <p>{marker.agency_name}</p>
              <p>{marker.trip_headsign}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}

export default TransportDashboard;
