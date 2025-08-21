import React, { useContext, useEffect, useState } from "react";
import convertTime from "../../utils/convertTime";
import { BASE_URL } from "../../../config";
import { authContext } from "../../context/Authcontext";
import { toast } from "react-toastify";

const SidePanel = ({ centerId, services, timeSlots }) => {
  const { token } = useContext(authContext);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [fetchedSlots, setFetchedSlots] = useState([]);
  const [bookingTime, setBookingTime] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  //api call to check available slots
  const getSlots = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/getAvailableSlots/${centerId}?serviceType=${encodeURIComponent(
          selectedService?.serviceType
        )}&appointmentDate=${encodeURIComponent(bookingDate)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg, ".Please try again.");
      }

      console.log("fetched", data.slots);

      setFetchedSlots(data.slots);
    } catch (error) {
      console.log(error.message);
    }
  };

  //api call to make booking
  const bookingHandler = async () => {
    console.log(bookingDate);
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/book-appointment/${centerId}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticketPrice: selectedService?.price,
            appointmentDate: bookingDate,
            appointmentTime: bookingTime,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg, ".Please try again.");
      }

      toast.success("Appointment Booked Successfully.");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  function handleSelectServiceChange(event) {
    const selectedServiceType = event.target.value;
    const service = services?.find(
      (service) => service.serviceType === selectedServiceType
    );
    setSelectedService(service);
    // console.log(service);
  }

  useEffect(() => {
    bookingDate && selectedService && getSlots();
    setSelectedIndex(-1);
    // console.log(fetchedSlots);
  }, [selectedService, bookingDate]);

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex-col items-center justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 w-full">
          <div>
            <p className="form_label ">Date :</p>
          </div>
          <div>
            <input
              type="date"
              className="form_input"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mb-5 gap-5 w-full">
          <div>
            <p className="form_label ">Service Type :</p>
          </div>
          <div>
            <select
              name="serviceType"
              value={selectedService ? selectedService.serviceType : "Select"}
              className="form_input"
              onChange={(e) => handleSelectServiceChange(e)}
            >
              <option value="">Select</option>
              {/* <option value="saturday">Saturday</option> */}
              {services?.map((serivce, ind) => (
                <option key={ind} value={serivce.serviceType}>
                  {serivce.serviceType}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <div>
            <p className="form_label ">Price :</p>
          </div>
          <div> ₹ {selectedService?.price}</div>
        </div>
      </div>

      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slot:
        </p>

        <ul className="mt-3">
          {fetchedSlots.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {fetchedSlots?.map((item, index) => (
                // <li key={index} className="flex items-center justify-between mb-2">
                //   <p className="text-[15px] leading-6 text-textColor font-semibold">
                //     {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                //   </p>
                //   <p className="text-[15px] leading-6 text-textColor font-semibold">
                //     {convertTime(item.startingTime)} -{" "}
                //     {convertTime(item.endingTime)}
                //   </p>
                // </li>

                <div
                  key={index}
                  className={`bg-green-600 rounded-md p-2 text-white flex items-center justify-center cursor-pointer
                ${
                  selectedIndex == index
                    ? "bg-green-200 border-2 text-textColor"
                    : " "
                }`}
                  onClick={() => {
                    setSelectedIndex(index);
                    setBookingTime(item.startingTime);
                  }}
                >
                  {convertTime(item.startingTime)}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-textColor p-2 flex items-center gap-4">
              No Slots Available
            </div>
          )}
        </ul>
      </div>

      <button className="btn px-2 w-full rounded-md" onClick={bookingHandler}>
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
