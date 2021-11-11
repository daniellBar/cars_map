import axios from "axios";

export const carsService = {
  query,
  getById,
};

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/cars"
    : "//localhost:3030/api/cars";

async function query(polygonPath) {
  try {
    const queryStr = polygonPath
      .map((p, idx) => `p${idx}=${JSON.stringify(p)}`)
      .join("&");
    const res = await axios.get(`${BASE_URL}?${queryStr}`);
    const cars = res.data;
    return cars;
  } catch (err) {
    console.log(err);
  }
}

async function getById(id) {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    const car = res.data;
    return car;
  } catch (err) {
    console.log(err);
  }
}
