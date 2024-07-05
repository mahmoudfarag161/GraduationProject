const { default: SummaryApi } = require("../common");

const fetchCategoryWiseProduct = async (categoryId) => {
  const response = await fetch(
    `${SummaryApi.categoryWiseProduct.url}/${categoryId}`
  );
  //     method : SummaryApi.categoryWiseProduct.method,
  //     headers : {
  //         "content-type" : "application/json"
  //     },
  //     body : JSON.stringify({
  //         category : category
  //     })
  // })

  const dataResponse = await response.json();

  return dataResponse;
};

export default fetchCategoryWiseProduct;
