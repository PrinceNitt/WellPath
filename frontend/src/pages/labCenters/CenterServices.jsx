import React from "react";

const CenterServices = ({ services }) => {
  return (
    <div>
      <div className="mb-[50px]">
        {services?.map((item, index) => (
          <>
            <div
              key={index}
              className="flex justify-between gap-10 mb-[30px] bg-blue-50 rounded-md"
            >
              <div className="flex-col gap-10 p-3 w-full">
                <div className="flex justify-between">
                  <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                    {item?.serviceType}
                  </h5>
                  <p className="text-[16px] leading-6 text-black font-semibold">
                    ₹ {item?.price}
                  </p>
                </div>

                <p className="text_para mt-3 font-medium text-[15px]">
                  {item?.serviceDescription}
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default CenterServices;
