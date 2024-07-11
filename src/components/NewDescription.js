import React, { useContext, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FadeLoader } from "react-spinners";

function NewDescription({ onClose, setDescription }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dataResponse = await fetch(
      "https://ronolos-chatbot.hf.space/generate_ad",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const dataApi = await dataResponse.json();
    setDescription(dataApi.ad);
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Generate Description</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="enter Product Title"
            name="title"
            value={data.title}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="description">description</label>
          <input
            type="text"
            id="description"
            placeholder="enter Product description"
            name="description"
            value={data.description}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="colors">colors</label>
          <input
            type="text"
            id="colors"
            placeholder="enter Product colors"
            name="colors"
            value={data.colors}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          {!isLoading && (
            <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
              Generate Description
            </button>
          )}
          {isLoading && (
            <div>
              <FadeLoader
                color="#d63838"
                className="px-6 py-2 w-full max-w-[150px]   transition-all mx-auto block mt-6"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default NewDescription;
