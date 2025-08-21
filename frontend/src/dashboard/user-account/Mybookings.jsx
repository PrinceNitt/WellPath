import { useContext } from "react";
import { BASE_URL } from "../../../config";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useFetchData from "../../hooks/useFetchData";
import { authContext } from "../../context/Authcontext";
import BookingsCard from "../../components/BookingsCard";
import { data } from "autoprefixer";

const Mybookings = () => {
  const { token } = useContext(authContext);

  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/user/appointments/my-appointments`, {
    method: "get",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && <Error errMsg={error} />}

      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-center text-primaryColor leading-7 text-[20px] font-semibold">
          No appointments booked yet.
        </h2>
      )}

      {!loading && !error && appointments.length !== 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((appointment, index) => (
            <BookingsCard bookings={appointment} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Mybookings;
