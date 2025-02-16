import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import AddItemInvoice from "./AddItemInvoice";
import { getAllData } from "../request/requestApi";

function Navbar({ setFilteredData }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllData()
      .then((res) => {
        setData(res);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  });
  const filtered =
    selectedStatus.length > 0
      ? data.filter((b) => selectedStatus.includes(b.status))
      : data;

  useEffect(() => {
    if (!data) return;
    setFilteredData(filtered);
  }, [selectedStatus, data, setFilteredData]);

  if (loading) {
    <p>Loading...</p>;
  }
  const uniqueStatus = [...new Set(data?.map((item) => item.status))];

  const handleFilterChange = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };
  return (
    <div className="flex justify-between items-center my-5 lg:mt-[72px] lg:mb-[65px] align-elements font-spartanMedium dark:bg-midnightBlack">
      <div>
        <h1 className="text-lg lg:text-[32px] font-bold dark:text-white">
          Invoices
        </h1>
        <div className="flex items-center text-steelBlue gap-1">
          <p className="hidden lg:block">There are</p>
          <p className="text-[12px] lg:text-[16px]">
            {data ? `${filtered.length} total invoices` : "No invoice"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn border-none rounded-full m-1 flex items-center bg-lightMist dark:text-white  dark:bg-midnightBlack"
          >
            <div className="flex gap-1">
              <span>Filter </span>
              <span className="hidden lg:block">by status</span>
            </div>
            <IoIosArrowDown className="text-royalPurple w-5 h-5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu  bg-lightMist dark:text-white  dark:bg-midnightBlack rounded-box z-[1] w-52 p-2 shadow flex flex-col"
          >
            {uniqueStatus?.map((status, index) => (
              <li key={index} className="flex flex-row items-center  gap-1">
                <label className="flex flex-row items-center  gap-3 cursor-pointer">
                  <input
                    onChange={() => handleFilterChange(status)}
                    checked={selectedStatus.includes(status)}
                    type="checkbox"
                    className="checkbox"
                  />
                  <span>{status}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <AddItemInvoice />
      </div>
    </div>
  );
}

export default Navbar;

{
  /* <button className="btn bg-royalPurple hover:bg-softLavender dark:border-none rounded-3xl text-lightMist text-[14px]">
          <IoIosAddCircleOutline className="w-7 h-7" />
          <div className="flex gap-1">
            <span>New</span>
            <span className="hidden lg:block">Invoice</span>
          </div>
        </button> */
}
