import { CarPreview } from "./CarPreview";

export const CarsList = ({ cars }) => {
  return (
    <div className="cars-list">
      {cars.map((car, idx) => (
        <CarPreview car={car} key={idx} />
      ))}
    </div>
  );
};
