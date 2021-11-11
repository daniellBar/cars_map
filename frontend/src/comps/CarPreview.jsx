export const CarPreview = ({ car }) => {
  return (
    <div className="car-preview">
      <div className="car-id">
        <div className="id-title title">ID:</div>
        <div className="id-val">{car.id}</div>
      </div>
      <div className="car-location">
        <div className="location-title title">Location:</div>
        <div className="location-lat">{`Lat: ${car.location.lat}`}</div>
        <div className="location-lng">{`Lng: ${car.location.lng}`}</div>
      </div>
    </div>
  );
};
