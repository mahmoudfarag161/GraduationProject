import { FaStar } from "react-icons/fa";

function Star({ starNum, rating }) {
  const active = starNum <= rating;
  return (
    <div>
      <FaStar
        className={`${active ? " text-yellow-500" : " text-slate-200"}`}
      />
    </div>
  );
}

export default Star;
