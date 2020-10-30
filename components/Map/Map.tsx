import React, { useEffect, useRef } from "react";
import Leaflet from "leaflet";
import LeafletGpx from "leaflet-gpx";

import "leaflet/dist/leaflet.css";

export interface MapProps {
  gpx: string;
}

export const Map: React.FC<MapProps> = ({ gpx }) => {
  const mapEl = useRef(null);
  const mapObj = useRef(null);

  useEffect(() => {
    if (mapObj.current) {
      return;
    }

    mapObj.current = Leaflet.map(mapEl.current, {
      scrollWheelZoom: false,
    }).setView([51.505, -0.09], 13);

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapObj.current);

    new LeafletGpx.GPX(gpx, {
      async: true,
      polyline_options: {
        color: "hotpink",
        opacity: 0.75,
        weight: 5,
        lineCap: "round",
      },
      marker_options: {
        startIconUrl: "marker-icon.png",
        endIconUrl: "marker-icon.png",
      },
    })
      .on("loaded", (e) => {
        mapObj.current.fitBounds(e.target.getBounds());
      })
      .addTo(mapObj.current);
  }, []);

  return (
    <div
      id="mapid"
      ref={mapEl}
      style={{
        width: "100%",
        height: "100vh",
        background: "hotpink",
      }}
    ></div>
  );
};
