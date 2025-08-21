import React, { useContext, useEffect, useState } from "react";
import { formateDate } from "../../utils/formateDate";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import { authContext } from "../../context/Authcontext";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { toast } from "react-toastify";
import { FaRegFilePdf } from "react-icons/fa6";
import HashLoader from "react-spinners/HashLoader";

const Appointments = () => {
  const { token } = useContext(authContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequest = async () => {
    //api call
    try {
      const res = await fetch(
        `${BASE_URL}/center/appointments/my-appointments`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.msg);
      }
      setLoading(false);

      setAppointments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const uploadReportHandler = async (url, appointmentId) => {
    //api call
    try {
      const res = await fetch(
        `${BASE_URL}/center/appointments/upload-report/${appointmentId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ report: url }),
        }
      );

      const { msg } = await res.json();

      if (!res.ok) {
        throw new Error(msg);
      }

      setLoading(false);
      toast.success(msg);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const deleteReportHandler = async (appointmentId) => {
    //api call
    try {
      const res = await fetch(
        `${BASE_URL}/center/appointments/delete-report/${appointmentId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { msg } = await res.json();

      if (!res.ok) {
        throw new Error(msg);
      }

      setLoading(false);
      toast.success(msg);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  useEffect(() => {
    //fetch the updated record
    fetchRequest();
  }, [selectedFile]);

  const handleFileInputChange = async (e, appointmentId) => {
    const file = e.target.files[0];
    console.log(appointmentId);

    const data = await uploadImageToCloudinary(file); // change cdn to file

    // console.log(data);
    await uploadReportHandler(data.url, appointmentId);
    setSelectedFile(file);
    // await fetchRequest();
  };

  const deleteFileChange = async (appointmentId) => {
    await deleteReportHandler(appointmentId);
    setSelectedFile(null);
    // await fetchRequest();
  };

  return (
    <>
      {appointments.length == 0 ? (
        <div className="flex justify-center items-center">
          <HashLoader size={25} color="#ffffff" />
        </div>
      ) : (
        <div>
          <table className="w-full text-left text-sm text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Service
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Booked On
                </th>
                <th scope="col" className="px-6 py-3">
                  Report
                </th>
              </tr>
            </thead>

            <tbody>
              {appointments?.map((item) => (
                <tr key={item._id}>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <img
                      src={item.user.photo}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {item.user.name}
                      </div>
                      <div className="text-normal text-gray-500">
                        {item.user.email}
                      </div>
                    </div>
                  </th>

                  <td className="px-6 py-4">{item.serviceType}</td>

                  {/* <td className="px-6 py-4">
                    {item.isPaid && (
                      <div className="flex items-center =">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                        Paid
                      </div>
                    )}
    
                    {!item.isPaid && (
                      <div className="flex items-center =">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                        Unpaid
                      </div>
                    )}
                  </td> */}

                  <td className="px-6 py-4">{item.ticketPrice}</td>
                  <td className="px-6 py-4">{`${formateDate(
                    item.appointmentDate
                  )} - ${item.appointmentTime}`}</td>

                  <td className="px-6 py-4">
                    {item.report === "null" ? (
                      //add report
                      <div className="relative w-[130px] h-[50px]">
                        <input
                          type="file"
                          name="report"
                          id="customFile"
                          accept=".pdf"
                          onChange={(e) => handleFileInputChange(e, item._id)}
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <label
                          htmlFor="customFile"
                          className="cursor-pointer absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] hover:text-green-400 text-headingColor"
                        >
                          {"Upload Report"}
                        </label>
                      </div>
                    ) : (
                      //view and delete
                      <div className="flex flex-row items-center justify-between w-[100px]">
                        <div>
                          <a
                            href={item.report}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex text-blue-500"
                          >
                            <FaRegFilePdf className="w-[30px] h-[30px]" />
                          </a>
                        </div>

                        <div>
                          <button
                            className="cursor-pointer  hover:text-red-400 text-headingColor"
                            onClick={() => deleteFileChange(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Appointments;
