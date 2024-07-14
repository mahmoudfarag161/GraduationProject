import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import uploadImage from "../helpers/uploadImage";
import { useContext, useState } from "react";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import Context from "../context";

function UploadPhoto({ onClose }) {
  const [imagesView, setImagesView] = useState([]);
  const formData = new FormData();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setPhotoData } = useContext(Context);

  async function handleSubmit(e) {
    e.preventDefault();
    formData.append("file", file);
    setIsLoading(true);
    const response = await fetch(
      "https://ronolos-photo-recognition.hf.space/classify/",
      {
        method: "post",
        body: formData,
      }
    );
    const responseData = await response.json();
    setIsLoading(false);
    if (responseData) {
      setPhotoData(responseData);
      console.log(responseData);
      onClose();
      navigate("photo-search");
    }
  }

  async function handleUploadimage(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const uploadImageCloudinary = await uploadImage(selectedFile);

    setImagesView((preve) => {
      return [...preve, uploadImageCloudinary.url];
    });
  }

  const handleDeleteimages = async (index) => {
    setImagesView("");
  };
  return (
    <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Search with Image</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="images" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadimage}
                />
              </div>
            </div>
          </label>
          <div>
            {imagesView[0] ? (
              <div className="flex items-center gap-2">
                {imagesView.map((el, index) => {
                  return (
                    <div key={index} className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                      />

                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteimages(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please upload search image
              </p>
            )}
          </div>
          {isLoading ? (
            <div>
              <FadeLoader
                color="#d63838"
                className="px-6 py-2 w-full max-w-[150px]   transition-all mx-auto block mt-6"
              />
            </div>
          ) : (
            <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
              search with image
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default UploadPhoto;
