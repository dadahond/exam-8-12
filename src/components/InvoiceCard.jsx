import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusStyle";

function InvoiceCard({ filteredData }) {
  return (
    <div>
      <div className="align-elements font-spartanMedium scrollbar scrollbar-thumb-sky-400 scrollbar-track-sky-100 h-[600px] overflow-y-scroll  ">
        {filteredData?.map((info) => (
          <Link
            to={`/about/${info.id}`}
            key={info.id}
            className="flex items-center justify-between p-4 lg:p-7 border-none rounded-lg shadow-md mb-5 dark:bg-darkSlate"
          >
            <div className="md:flex md:flex-row md:items-center md:gap-7">
              <p className="font-bold dark:text-white">#{info.id}</p>
              <span className="text-steelBlue py-3 md:py-0">
                Due {info.paymentDue}
              </span>
              <p className="text-steelBlue hidden md:block">
                {info.clientName}
              </p>
              <p className="font-bold text-lg dark:text-white md:hidden">
                £ {info.total}
              </p>
            </div>
            <div className="flex flex-col items-end gap-3 md:flex md:flex-row md:items-center md:gap-5">
              <p className="font-bold text-lg dark:text-white hidden md:block">
                £ {info.total}
              </p>
              <p className="text-steelBlue md:hidden ">{info.clientName}</p>
              <div
                className={` lg:px-3 lg:py-2 rounded-md capitalize flex items-center `}
              >
                <StatusBadge status={info.status} />
              </div>
              <MdKeyboardArrowRight className="w-6 h-6 text-royalPurple hidden md:block" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default InvoiceCard;
