import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";
import Context from "../context";

const ChangePassword = () => {
  const user = useSelector((state) => state?.user?.user);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    currentPassword: "",
    password: "",
    passwordConfirm: "",
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

    if (data.password === data.passwordConfirm) {
      const dataResponse = await fetch(SummaryApi.changePassword.url , {
        method: SummaryApi.changePassword.method,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({password: data.password}),
      });

      const dataApi = await dataResponse.json();
      setLoading(false);
      if (dataApi.data) {
        toast.success("Password Updated Successful");
        navigate("/profile");
      }

      if (dataApi.errors) {
        toast.error("Error password not updated");
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <section id="change-password">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>

            <div>
              <label>Current Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="enter current password"
                  value={data.currentPassword}
                  name="currentPassword"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowCurrentPassword((preve) => !preve)}
                >
                  <span>{showCurrentPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>New Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter a new password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm New Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="enter confirm new password"
                  value={data.passwordConfirm}
                  name="passwordConfirm"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />

                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
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

export default ChangePassword;
