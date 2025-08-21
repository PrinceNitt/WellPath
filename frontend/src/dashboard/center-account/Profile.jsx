/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../../config";
import { authContext } from "../../context/Authcontext";
import { toast } from "react-toastify";

const Profile = ({ centerData }) => {
  const { token } = useContext(authContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    city: "",
    address: "",
    ticketPrice: 0,
    services: [],
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: centerData?.name,
      email: centerData?.email,
      phone: centerData?.phone,
      bio: centerData?.bio,
      gender: centerData?.gender,
      specialization: centerData?.specialization,
      city: centerData?.city,
      address: centerData?.address,
      ticketPrice: centerData?.ticketPrice,
      services: centerData?.services,
      qualifications: centerData?.qualifications,
      experiences: centerData?.experiences,
      timeSlots: centerData?.timeSlots,
      about: centerData?.about,
      photo: centerData?.photo,
    });
  }, [centerData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/center/${centerData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.msg);
      }

      toast.success(result.msg);
    } catch (error) {
      toast.error(error.message);
    }
  };

  //reusable function for adding item
  //SAMJHANA HAI
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  //reusable function for input change
  const handleReusableFileInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];

      updateItems[index][name] = value;

      return { ...prevFormData, [key]: updateItems };
    });
  };

  //reusable function for deleting item
  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((q, i) => i !== index),
    }));
  };

  // const addQualification = (e) => {
  //   e.preventDefault();

  //   addItem("qualifications", {
  //     startingDate: "",
  //     endingDate: "",
  //     degree: "MBBS",
  //     university: "AIIMS",
  //   });
  //   console.log(formData);
  // };
  // const handleQualificationChange = (event, index) => {
  //   handleReusableFileInputChangeFunc("qualifications", index, event);
  // };
  // const deleteQualification = (e, index) => {
  //   e.preventDefault();
  //   deleteItem("qualifications", index);
  // };

  const addService = (e) => {
    e.preventDefault();

    addItem("services", {
      serviceType: "",
      serviceDescription: "",
      price: 0,
    });
  };
  const handleServiceChange = (event, index) => {
    handleReusableFileInputChangeFunc("services", index, event);
  };
  const deleteService = (e, index) => {
    e.preventDefault();
    deleteItem("services", index);
  };

  // const addExperience = (e) => {
  //   e.preventDefault();

  //   addItem("experiences", {
  //     startingDate: "",
  //     endingDate: "",
  //     position: "",
  //     hospital: "",
  //   });
  // };
  // const handleExperienceChange = (event, index) => {
  //   handleReusableFileInputChangeFunc("experiences", index, event);
  // };
  // const deleteExperience = (e, index) => {
  //   e.preventDefault();
  //   deleteItem("experiences", index);
  // };

  const addTimeSlot = (e) => {
    e.preventDefault();

    addItem("timeSlots", {
      serviceType: "",
      day: "",
      startingTime: "",
      endingTime: "",
      maxPatientsCount: 0,
    });
  };
  const handleTimeSlotChange = (event, index) => {
    console.log(event.target.value);
    handleReusableFileInputChangeFunc("timeSlots", index, event);
  };
  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form>
        <div className="mb-5">
          <p className="form_label ">Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form_input"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form_input"
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form_input"
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Bio</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form_input"
            maxLength="100"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Address</p>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="form_input"
            maxLength="100"
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px] ">
            <div>
              <p className="form_label">City</p>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="form_input"
                maxLength="100"
              />
            </div>
            <div>
              <p className="form_label">State</p>
              <input
                type="text"
                name="state"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="State"
                className="form_input"
                maxLength="100"
              />
            </div>
            {/* <div>
              <p className="form_label">Gender</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Others</option>
              </select>
            </div> */}
            <div>
              <p className="form_label">Specialization</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="Radiology">Radiology</option>
                <option value="Pathology">Pathology</option>
                <option value="Imaging Center">Imaging Center</option>
              </select>
            </div>
          </div>
        </div>

        {/* QUALIFICATIONS */}
        {/* <div className="mb-5">
          <p className="form_label py-3.5 ">Qualifications</p>
          {formData.qualifications?.map((items, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Sarting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={items.startingDate}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form_label">Ending Date</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={items.endingDate}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Degree</p>
                    <input
                      type="text"
                      name="degree"
                      value={items.degree}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form_label">University</p>
                    <input
                      type="text"
                      name="university"
                      value={items.university}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => deleteQualification(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] "
                >
                  {" "}
                  <AiOutlineDelete />{" "}
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addQualification}
            className="bg-[#000] py-3 px-5 rounded text-white cursor-pointer h-fit "
          >
            Add Qualifications
          </button>
        </div> */}

        {/* Services */}
        <div className="mb-5">
          <p className="form_label py-3.5 ">Available Diagnosis Services</p>
          {formData.services?.map((items, index) => (
            <div key={index}>
              <div>
                {/* <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Sarting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={items.startingDate}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form_label">Ending Date</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={items.endingDate}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div> */}

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Test Name</p>
                    <input
                      type="text"
                      name="serviceType"
                      value={items.serviceType}
                      className="form_input"
                      placeholder="Test Name"
                      onChange={(e) => handleServiceChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form_label">Price</p>
                    <input
                      type="number"
                      name="price"
                      value={items.price}
                      className="form_input"
                      placeholder="Prince in INR"
                      onChange={(e) => handleServiceChange(e, index)}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <p className="form_label">Service Details</p>
                  <input
                    type="text"
                    name="serviceDescription"
                    value={items.serviceDescription}
                    onChange={(e) => handleServiceChange(e, index)}
                    placeholder="Service Description"
                    className="form_input"
                  />
                </div>

                <button
                  onClick={(e) => deleteService(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] "
                >
                  {" "}
                  <AiOutlineDelete />{" "}
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addService}
            className="bg-[#000] py-3 px-5 rounded text-white cursor-pointer h-fit "
          >
            Add Service
          </button>
        </div>

        {/* EXPERIENCES */}
        {/* <div className="mb-5">
          <p className="form_label py-3.5 ">Experiences</p>
          {formData.experiences?.map((items, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Sarting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={items.startingDate}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form_label">Ending Date</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={items.endingDate}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Position</p>
                    <input
                      type="text"
                      name="position"
                      value={items.position}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form_label">Hospital</p>
                    <input
                      type="text"
                      name="hospital"
                      value={items.hospital}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => deleteExperience(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] "
                >
                  {" "}
                  <AiOutlineDelete />{" "}
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addExperience}
            className="bg-[#000] py-3 px-5 rounded text-white cursor-pointer h-fit "
          >
            Add Experiences
          </button>
        </div> */}

        {/* TIME SLOTS */}
        <div className="mb-5">
          <p className="form_label py-3.5 ">Time Slots</p>
          {formData.timeSlots?.map((items, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                  <div>
                    <p className="form_label">Service Type</p>
                    <select
                      name="serviceType"
                      value={items.serviceType}
                      className="form_input py-3.5"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    >
                      <option value="">Select</option>
                      {/* <option value="saturday">Saturday</option> */}
                      {formData?.services?.map((serivce, ind) => (
                        <option key={ind} value={serivce.serviceType}>
                          {serivce.serviceType}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="form_label">Day</p>
                    <select
                      name="day"
                      value={items.day}
                      className="form_input py-3.5"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    >
                      <option value="">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>

                  <div>
                    <p className="form_label">Starting Time</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={items.startingTime}
                      className="form_input"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Time</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={items.endingTime}
                      className="form_input"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Count of Patients Accomodable</p>
                    <input
                      type="number"
                      name="maxPatientsCount"
                      value={items.maxPatientsCount}
                      className="form_input"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteTimeSlot(e, index)}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-6  "
                    >
                      {" "}
                      <AiOutlineDelete />{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addTimeSlot}
            className="bg-[#000] py-3 px-5 rounded text-white cursor-pointer h-fit "
          >
            Add TimeSLot
          </button>
        </div>

        <div className="mb-5">
          <p className="form_label font-semibold">About</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about your center"
            onChange={handleInputChange}
            className="form_input"
          ></textarea>
        </div>

        <div className="mb-5 flex items-center gap-3">
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
              Upload Photo
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
