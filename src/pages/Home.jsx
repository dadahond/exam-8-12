import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import InvoiceCard from "../components/InvoiceCard";
import NoInvoice from "../components/NoInvoice";
import { getAllData } from "../request/requestApi";

function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [filteredData, setFilteredData] = useState([]);

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

  if (loading) {
    <p>Loading...</p>;
  }
  return (
    <div>
      <Navbar setFilteredData={setFilteredData} />
      {data && data.length > 0 ? (
        <InvoiceCard filteredData={filteredData} />
      ) : (
        <NoInvoice />
      )}
    </div>
  );
}

export default Home;
