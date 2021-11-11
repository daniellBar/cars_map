import React, { useState, useRef, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";

//London, the UK Lat Long Coordinates Info
const center = {
  lat: 51.509865,
  lng: -0.118092,
};

const options = {
  fillColor: "lightblue",
  fillOpacity: 0.35,
  strokeColor: "red",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  zIndex: 1,
};

function Map({ onChangePolygon }) {
  // set path with some coords i selected
  const [path, setPath] = useState([
    { lat: 51.522232685660924, lng: -0.12746840775733106 },
    { lat: 51.4991399439482, lng: -0.1593366761123995 },
    { lat: 51.49819248248852, lng: -0.09708743393970025 },
  ]);

  // call onChangePolygon when path changes
  useEffect(() => {
    onChangePolygon(path);
  }, [path,onChangePolygon]);

  // define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  // bind refs to current Polygon and listeners
  const onLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCTwmmUbksAqfSEKLn9fR4oSVbBimBrXvk">
      <GoogleMap mapContainerClassName="map" center={center} zoom={11}>
        <Polygon
          onLoad={onLoad}
          path={path}
          onUnmount={onUnmount}
          onDragEnd={onEdit}
          onMouseUp={onEdit}
          editable
          draggable
          options={options}
        />
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
