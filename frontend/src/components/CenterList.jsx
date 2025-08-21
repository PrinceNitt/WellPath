import CentersCard from "./CentersCard";

import { BASE_URL } from "../../config";
import useFetchData from "../hooks/useFetchData";
import Loader from "./Loading";
import Error from "./Error";

const CenterList = () => {
  const { data: centers, loading, error } = useFetchData(`${BASE_URL}/center`);

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {centers.map((center) => (
            <CentersCard key={center.id} center={center} />
          ))}
        </div>
      )}
    </>
  );
};

export default CenterList;
