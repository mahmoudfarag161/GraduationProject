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
    <div className="container mx-auto p-4">
      {/***desktop version */}
      <div className="hidden lg:grid">
        {/***right side ( product ) */}
        <div className="px-4">
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            <SubCategoryCard data={data} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
