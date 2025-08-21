import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { authContext } from "../../context/Authcontext";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { token } = useContext(authContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    bloodType: "",
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];

    const data = await uploadImageToCloudinary(file);

    // console.log(data);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (e) => {
    // console.log(formData);
    e.preventDefault();
    setLoading(true);

    //api call
    try {
      const res = await fetch(`${BASE_URL}/user/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { msg } = await res.json();

      if (!res.ok) {
        throw new Error(msg);
      }

      console.log("registered ", res);
      setLoading(false);
      toast.success(msg);
      navigate("/users/profile/me");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full py-3 border-b border-solid border-[#0066ff61]
                focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                placeholder:text-textColor cursor-pointer"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full py-3 border-b border-solid border-[#0066ff61]
                focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                placeholder:text-textColor cursor-pointer"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full py-3 border-b border-solid border-[#0066ff61]
                focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                placeholder:text-textColor cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Blood Type"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full py-3 border-b border-solid border-[#0066ff61]
                focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                placeholder:text-textColor cursor-pointer"
            required
          />
        </div>
        <div className="mb-5 items-center flex justify-between">
          <label
            className="text-headingColor font-bold text-[16px] 
                  leading-7"
          >
            Gender:
            <select
              name="gender"
              className="text-textColor font-semibold text-[15px] leading-7
                    px-4 py-5 focus:outline-none"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Feale</option>
              <option value="others">Others</option>
            </select>
          </label>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {/* show image only when slected */}
          {formData.photo && (
            <figure className="w-[60px] rounded-full border-solid border-2 border-primaryColor">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              accept=".jpg, .png"
              onChange={handleFileInputChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="cursor-pointer absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-headingColor"
            >
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            // disabled={loading && true}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[10px] rounded-lg px-4 py-3"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
