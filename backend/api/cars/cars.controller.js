const carsService = require("./cars.service.js");

async function getCars(req, res) {
  polygonPath = _buildPolygonPath(req.query);
  const cars = await carsService.query(polygonPath);
  res.send(cars);
}

async function getCar(req, res) {
  const car = await carsService.getById(req.params.id);
  res.send(car);
}

function _buildPolygonPath(query) {
  const path = [];
  Object.values(query).forEach(p=>{
    path.push(JSON.parse(p))
  })
  return path;
}

module.exports = {
  getCar,
  getCars,
};
