import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StatusBadge from "./StatusStyle";
import { getOneData } from "../request/requestApi";
import EditDrawer from "./EditDrawer";
import DeleteModal from "./DeleteModal";

function AboutHeader() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getOneData(id)
      .then((res) => {
        setData(res);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleMarkAsPaid = async () => {
    try {
      const response = await fetch(`http://localhost:3000/data/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "paid" }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/data/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Xatolik yuz berdi");
      }
      window.location.href = "/";
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  return (
    <div className="flex justify-between items-center align-elements mb-10 font-spartanMedium">
      <div className="flex items-center gap-5">
        <span className="text-steelBlue">Status</span>
        <StatusBadge status={data?.status} />
      </div>
      <div className="flex items-center gap-3">
        <EditDrawer />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-coralRed hover:bg-softRed p-4 rounded-[50px] text-lightMist font-spartanBold font-bold "
        >
          Delete
        </button>
        {data?.status === "paid" ? (
          ""
        ) : (
          <button
            onClick={handleMarkAsPaid}
            className="bg-royalPurple hover:bg-softLavender p-4 rounded-[50px] text-lightMist font-spartanBold font-bold"
          >
            MarkAsPaid
          </button>
        )}
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          handleDelete();
        }}
        invoiceId={data?.id}
      />
    </div>
  );
}

export default AboutHeader;
