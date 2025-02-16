import React from "react";

function NoInvoice() {
  return (
    <div className="grid place-items-center h-[600px] m-0 font-spartanMedium dark:bg-charcoalBlue">
      <div className="flex flex-col items-center">
        <img src=" public/no-invoice.png" alt="" />
        <h3 className="font-bold text-[20px] p-4 dark:text-white">
          There is nothing here
        </h3>
        <p className="text-center text-steelBlue">
          {" "}
          Create an invoice by clicking the <br />{" "}
          <strong className="dark:text-white">New Invoice</strong> button and
          get started
        </p>
      </div>
    </div>
  );
}

export default NoInvoice;
