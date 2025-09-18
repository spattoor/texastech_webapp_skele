import React, { useEffect, useRef } from 'react';

// Add type declaration for window.google
declare global {
  interface Window {
    google: any;
  }
}

const TTU_COORDS = { lat: 33.5846, lng: -101.8781 };

const GoogleMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
    script.async = true;
    script.onload = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: TTU_COORDS,
          zoom: 15,
        });
        new window.google.maps.Marker({ position: TTU_COORDS, map, title: 'Texas Tech University' });
      }
    };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px', borderRadius: 12, margin: '32px 0' }} />;
};

export default GoogleMap;
