"use client";

import { useEffect, useRef } from "react";

interface LeafletMap {
  remove: () => void;
  setView: (latlng: [number, number], zoom: number) => LeafletMap;
}

interface LeafletMarker {
  addTo: (map: LeafletMap) => LeafletMarker;
  bindPopup: (content: string) => void;
}

interface LeafletLibrary {
  map: (element: HTMLElement) => LeafletMap;
  tileLayer: (url: string, options: Record<string, unknown>) => {
    addTo: (map: LeafletMap) => void;
  };
  circle: (latlng: [number, number], options: Record<string, unknown>) => {
    addTo: (map: LeafletMap) => void;
  };
  marker: (latlng: [number, number]) => LeafletMarker;
}

declare global {
  interface Window {
    L: LeafletLibrary;
  }
}

interface ServiceAreaMapProps {
  className?: string;
}

export default function ServiceAreaMap({ className = "" }: ServiceAreaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;

    script.onload = () => {
      if (mapRef.current && !mapInstanceRef.current && window.L) {
        const L = window.L;

        // Initialize map
        const map = L.map(mapRef.current).setView([39.1404477, -121.6169108], 9);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        // Add service area circle with red color (#FF0000)
        L.circle([39.1404477, -121.6169108], {
          color: "#FF0000",
          fillColor: "#FF0000",
          fillOpacity: 0.3,
          radius: 40233.5,
        }).addTo(map);

        // Add marker at center
        const marker = L.marker([39.1404477, -121.6169108]).addTo(map);
        marker.bindPopup("");

        mapInstanceRef.current = map;
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return <div ref={mapRef} className={`w-full h-full ${className}`} />;
}

