import React, { useState, useEffect } from "react";

import DatatablePage from "./DatatablePage";
import NavigationBar from "./NavigationBar";

import axios from "axios";

function App() {
  const url = "/api/incidents/";

  const [tableData, setTableData] = useState([]);

  const MINUTE_MS = 60000;

  const columns = [
    {
      Header: "Event Datetime",
      accessor: "eventDate",
    },
    {
      Header: "Device ID",
      accessor: "deviceId",
    },
    {
      Header: "Latitude, Longitude",
      accessor: "coordinates",
    },
    {
      Header: "Google Maps",
      accessor: "link",
      Cell: (e) => (
        <a href={e.value} target="_blank" rel="noreferrer">
          {" "}
          <u>Click here</u>{" "}
        </a>
      ),
    },
  ];

  const getIncidents = () => {
    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          let data = response.data.incidents;
          data = data.map((obj) => {
            let lat = obj.device_data.uplink_message.locations.user.latitude;
            let lon = obj.device_data.uplink_message.locations.user.longitude;
            let eventDate = new Date(Math.trunc(obj.sample_time / 1000) * 1000);
            return {
              eventDate: `${eventDate.toDateString()}, ${eventDate.toTimeString()}`,
              deviceId: obj.device_id,
              coordinates: `${lat},${lon}`,
              link: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
            };
          });
          setTableData(data);
        }
      });
  };

  useEffect(() => {
    getIncidents();
    const interval = setInterval(() => {
      getIncidents();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <NavigationBar />
      <DatatablePage columns={columns} data={tableData} />
    </div>
  );
}

export default App;
