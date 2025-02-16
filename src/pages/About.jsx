import React, { useEffect, useState } from "react";
import AboutHeader from "../components/AboutHeader";
import { FaAngleLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { getOneData } from "../request/requestApi";
// import { useFetch } from "../hooks/useFetch";

function About() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { id } = useParams();

useEffect(()=>{
    setLoading(true)
    getOneData(id).then((res)=>{
      setData(res)
    }).catch(()=>{

    }).finally(()=>{
      setLoading(false)
    })
  },[])



  if (loading) {
    return <div>Loading...</div>;
  }
  // const product = data.find((item) => String(item.id) === id);
  if (!data) {
    return <div>No item found</div>;
  }
  return (
    <div className="font-spartanMedium bg-lightMist text-midnightBlack dark:bg-dark-bg dark:text-dark-text">
      <Link to={"/"} className="flex items-center gap-2 align-elements p-5">
        <FaAngleLeft className="text-royalPurple" />
        Go back
      </Link>
      <AboutHeader />
      <div className="align-elements">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <span className="text-lg font-bold">{data.id}</span>
            <p className="text-mutedBlue">{data.description}</p>
          </div>
          <div className="flex flex-col text-right text-mutedBlue ">
            <span>{data.senderAddress.street}</span>
            <span>{data.senderAddress.city}</span>
            <span>{data.senderAddress.postCode}}</span>
            <span>{data.senderAddress.country}</span>
          </div>
        </div>
        <div className="flex justify-between mb-11">
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-mutedBlue">Invoice Date</span>
              <p className="text-lg font-bold">{data.createdAt}</p>
            </div>
            <div>
              <span className="text-mutedBlue">Payment Due</span>
              <p className="text-lg font-bold">{data.paymentDue}</p>
            </div>
          </div>
          <div>
            <span className="text-mutedBlue">Bill To</span>
            <p className="text-lg font-bold py-4">{data.clientName}</p>
            <address className="text-mutedBlue">
              {data.clientAddress.street} <br />
              {data.clientAddress.city}
              <br />
              {data.clientAddress.postCode} <br />{" "}
              {data.clientAddress.country}
            </address>
          </div>
          <div className="flex flex-col">
            <span className="text-mutedBlue">Sent to</span>
            <a
              className="text-lg font-bold"
              href={`mailto:{data.clientEmail}`}
            >
              {data.clientEmail}
            </a>
          </div>
        </div>
        <div className="bg-lightMist dark:bg-darkSlate p-6 rounded-t-2xl shadow-md">
          <div className="grid grid-cols-4 text-mutedBlue font-medium text-sm pb-4 ">
            <p>Item Name</p>
            <p className="text-center">QTY.</p>
            <p className="text-center">Price</p>
            <p className="text-right">Total</p>
          </div>

          {data.items &&
            data.items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-4 py-4 text-lg font-semibold "
                >
                  <p className="text-midnightBlack dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-center text-mutedBlue dark:text-white">
                    {item.quantity}
                  </p>
                  <p className="text-center text-mutedBlue dark:text-white">
                    £{item.price.toFixed(2)}
                  </p>
                  <p className="text-right text-midnightBlack dark:text-white">
                    £{item.total.toFixed(2)}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="bg-darkSlate  dark:bg-midnightBlack p-6 rounded-b-2xl flex justify-between items-center">
          <p className="text-lightMist">Amount Due</p>
          <p className="text-2xl font-bold text-white">
            £{data.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
