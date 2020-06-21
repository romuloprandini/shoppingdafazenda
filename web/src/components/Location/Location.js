import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const ShowPopUpMarker = (props) => {
  const initMarker = (ref) => {
    if (ref) {
      ref.leafletElement.openPopup();
    }
  };

  return <Marker ref={initMarker} {...props} />;
};

const Location = ({ zoom, center, popupText }) => {
  return (
    <div className="flex w-full">
      <div className="sm:mx-20 border-1 border-gray-500 bg-gray-400 w-full">
        <Map center={center} zoom={zoom} className="location-map h-320px lg:h-520px">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ShowPopUpMarker position={center}>
            <Popup>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`http://maps.google.com/?q=${center.join(',')}`}
              >
                {popupText}
              </a>
            </Popup>
          </ShowPopUpMarker>
        </Map>
      </div>
    </div>
  );
};

export default Location;
