import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";
import Context from "../context";

const ChangeAccountDetails = () => {
  const user = useSelector((state) => state?.user?.user);
  
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const { token } = useContext(Context);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    const dataResponse = await fetch(SummaryApi.changeAccountDetails.url , {
      method: SummaryApi.changeAccountDetails.method,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone
      }),
    });

    const dataApi = await dataResponse.json();
    setLoading(false);
    if (dataApi.data) {
      toast.success("Account Details Updated Successful");
      navigate("/profile");
    }

    if (dataApi.errors) {
      toast.error("Error Details not updated");
    }
    
  };

  return (
    <section id="update-account-details">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>

            <div className="grid">
              <label>Name : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Phone : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="01234567890"
                  name="phone"
                  value={data.phone}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>


            {loading ? (
              <div>
                <FadeLoader
                  color="#d63838"
                  className="px-6 py-2 w-full max-w-[150px]   transition-all mx-auto block mt-6"
                />
              </div>
            ) : (
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Update
              </button>
            )}
          </form>

        </div>
      </div>
    </section>
  );
};

export default ChangeAccountDetails;
