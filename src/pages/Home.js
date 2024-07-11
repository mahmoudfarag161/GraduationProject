import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import { useEffect, useState } from "react";
import SummaryApi from "../common";
import VerticalCardProduct from "../components/VerticalCardProduct";
import { useSelector } from "react-redux";
import Recommendation from "../components/Recommendation";

const Home = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state?.user?.user);

  const fetchSubCategory = async () => {
    const res = await fetch(SummaryApi.getAllSubCategories.url);
    const responseData = await res.json();

    setData(responseData?.data);
  };

  useEffect(() => {
    if (!user) fetchSubCategory();
  }, [user]);
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      {!user ? (
        data?.map(function (subCategory) {
          return (
            <VerticalCardProduct
              key={subCategory?._id}
              subCategoryId={subCategory?._id}
              heading={subCategory?.name}
            />
          );
        })
      ) : (
        <Recommendation id={user?._id} />
      )}
    </div>
  );
};

export default Home;
