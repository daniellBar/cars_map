const fs = require("fs").promises;
const geolib = require("geolib");

const dataPath = "cars.json";

async function query(polygonPath = []) {
  let cars = await fs
    .readFile(dataPath, "utf8")
    .catch((err) => console.log(err));
  if (polygonPath.length > 0) {
    filteredCars = JSON.parse(cars).filter(({ location }) =>
      geolib.isPointInPolygon(
        { latitude: location.lat, longitude: location.lng },
        polygonPath
      )
    );
    return filteredCars;
  }
  return JSON.parse(cars);
}

async function getById(carId) {
  const cars = await fs
    .readFile(dataPath, "utf8")
    .catch((err) => console.log(err));
  const car = JSON.parse(cars).find(({ id }) => id === carId);
  return car;
}

module.exports = {
  query,
  getById,
};
