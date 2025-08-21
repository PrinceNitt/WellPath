import { useState } from "react";
import starIcon from "../../assets/images/Star.png";
import CenterAbout from "./CenterAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loading";
import Error from "../../components//Error";
import { useParams } from "react-router-dom";
import CenterServices from "./CenterServices";

const CenterDetails = () => {
  const [tab, setTab] = useState("about");

  const { id } = useParams();

  const {
    data: center,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/center/${id}`);

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loader />}
        {error && <Error />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={center.photo} alt="" className="w-full" />
                </figure>

                <div>
                  <span
                    className="bg-[#ccf0f3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 
                lg:text-[16px] lg:leading-7 font-semibold rounded"
                  >
                    {center.specialization}
                  </span>

                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {center.name}
                  </h3>

                  <div className="flex items-center gap-[6px]">
                    <span
                      className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px]
                  lg:leading-7 font-semibold text-headingColor"
                    >
                      <img src={starIcon} alt="" /> {center.avgRating}
                    </span>
                    <span
                      className="text-[14px] leading-5 lg:text-[16px] font-[400]
                  lg:leading-7 text-textColor"
                    >
                      ({center.totalRating})
                    </span>
                  </div>

                  <p className="text_para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                    {center.bio}
                  </p>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  About
                </button>

                <button
                  onClick={() => setTab("services")}
                  className={`${
                    tab === "services" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Services
                </button>

                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Feedback
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "about" && (
                  <CenterAbout
                    name={center.name}
                    about={center.about}
                    qualifications={center.qualifications}
                    experiences={center.experiences}
                  />
                )}
                {tab === "services" && (
                  <CenterServices services={center.services} />
                )}
                {tab === "feedback" && (
                  <Feedback
                    reviews={center.reviews}
                    totalRating={center.totalRating}
                  />
                )}
              </div>
            </div>

            <div>
              <SidePanel
                centerId={center._id}
                services={center.services}
                timeSlots={center.timeSlots}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CenterDetails;
