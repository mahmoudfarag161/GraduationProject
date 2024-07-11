import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import SubCategoryCard from "../components/SubCategoryCard";
const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const categoryId = urlSearch.getAll("category");

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `${SummaryApi.categoryProduct.url}/${categoryId}/subcategories`
    );

    const dataResponse = await response.json();
    setLoading(false);
    setData(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" p-5 ">
      <SubCategoryCard data={data} loading={loading} />
    </div>
  );
};

export default CategoryProduct;
