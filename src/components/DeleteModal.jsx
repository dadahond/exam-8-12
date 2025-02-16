import React from "react";

function DeleteModal({ isOpen, onClose, onConfirm, invoiceId }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-md">
      <div className="list-a rounded-lg p-6 w-[600px] shadow-2xl">
        <h3 className="text-xl font-bold ">Confirm Deletion</h3>
        <p className=" mt-2">
          Are you sure you want to delete invoice{" "}
          <span className="font-bold">#{invoiceId}</span>? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 text-midnightBlack bg-lightMist rounded-2xl"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-coralRed rounded-2xl"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
