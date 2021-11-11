import Map from "./comps/Map.jsx";
import { useCallback, useState } from "react";
import { carsService } from "./services/carsService.js";
import { CarsList } from "./comps/CarsList.jsx";

export function App() {
  const [cars, setCars] = useState([]);

  // load and set cars
  const onChangePolygon = useCallback(
    async (path) => {
      const polygonPath = path.map((coord) => ({
        latitude: coord.lat,
        longitude: coord.lng,
      }));
      const _cars = await carsService.query(polygonPath);
      setCars(_cars);
    },
    [setCars]
  );

  return (
    <div className="app">
      <Map onChangePolygon={onChangePolygon} />
      <h1 className="cars-title">{`Cars found: ${
        cars.length ? cars.length : "None"
      }`}</h1>
      <CarsList cars={cars} />
    </div>
  );
}
