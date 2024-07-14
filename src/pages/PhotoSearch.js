import { useContext } from "react";
import Context from "../context";
import VerticalCard from "../components/VerticalCard";

function PhotoSearch() {
  const { photoData } = useContext(Context);
  const updatedPhotoData = photoData.map((item) => {
    return {
      ...item,
      _id: item.product_id,
    };
  });
  console.log(updatedPhotoData);
  return (
    <div className="container mx-auto p-4">
      <p className="text-lg font-semibold my-3">
        Search Results : {photoData.length}
      </p>

      {photoData.length === 0 && (
        <p className="bg-white text-lg text-center p-4">No Data Found....</p>
      )}

      {photoData.length !== 0 && (
        <VerticalCard loading={false} data={updatedPhotoData} />
      )}
    </div>
  );
}

export default PhotoSearch;
