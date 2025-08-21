/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { formateDate } from "../utils/formateDate";
import convertTime from "../utils/convertTime";

const BookingsCard = ({ bookings }) => {
  const {
    center,
    serviceType,
    appointmentDate,
    appointmentTime,
    ticketPrice,
    report,
  } = bookings;
  console.log(bookings, "center");

  return (
    <div className="p-3 lg:p-5">
      <div className="w-[100px] h-[100px]">
        <img src={center?.photo} alt="" />
      </div>

      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
        {center?.name}
      </h2>

      <div className="mt-2 lg:mt-3 flex-col items-center">
        <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-2 text-[10px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
          {serviceType}
        </span>

        <div className="flex justify-between items-center gap-[6px] mt-3">
          <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 text-textColor font-[400]">
            {formateDate(appointmentDate)}
          </span>
          <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 text-textColor font-[400]">
            {appointmentTime}
          </span>
        </div>
      </div>

      <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
        <div>
          <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
            Report:
          </h3>
          <p className="text-[14px] font-[400] leading-6 text-textColor">
            {report}
          </p>
        </div>

        <Link
          to={`/centers/${center?._id}`}
          className="w-[44px] h-[44px] rounded-full border border-solid
                borer-[#181A1E] flex items-center justify-center group hover:bg-primaryColor
                hover:border-none"
        >
          <BsArrowRight className="group-hover:text-white w-6 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default BookingsCard;
