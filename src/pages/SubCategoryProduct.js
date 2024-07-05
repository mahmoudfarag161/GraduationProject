import { useEffect, useState } from "react";
import SummaryApi from "../common";
import { useParams } from "react-router-dom";
import VerticalCard from "../components/VerticalCard";

function SubCategoryProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const fetchProduct = async () => {
    setLoading(true);
    const res = await fetch(
      `${SummaryApi.allProduct.url}?subcategory=${params?.id}`
    );
    const categoryProduct = await res.json();
    setLoading(false);

    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div>
      <VerticalCard data={data} loading={loading} />
    </div>
  );
}

export default SubCategoryProduct;
