import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import { useEffect, useState } from "react";
import SummaryApi from "../common";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  const [data, setData] = useState([]);

  const fetchSubCategory = async () => {
    const res = await fetch(SummaryApi.getAllSubCategories.url);
    const responseData = await res.json();

    setData(responseData?.data);
  };

  console.log(data[0]);

  useEffect(() => {
    fetchSubCategory();
  }, []);
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      {data.map(function (subCategory) {
        return (
          <VerticalCardProduct
            key={subCategory?._id}
            subCategoryId={subCategory?._id}
            heading={subCategory?.name}
          />
        );
      })}
    </div>
  );
};

export default Home;
