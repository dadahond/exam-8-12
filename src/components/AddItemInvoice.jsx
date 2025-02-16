import FormInput from "./FormInput";
import { objectCreater } from "../utils/objectCreator";

import { MdOutlineDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useRef, useState } from "react";

function AddItemInvoice() {
  const drawerRef = useRef(null);
  const formRef = useRef(null);
  const [items, setItems] = useState([]);

  // discard button
  const handleDiscard = () => {
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }
    if (formRef.current) {
      formRef.current.reset();
    }
    setItems([]);
  };

  // add new item button
  const addNewItem = () => {
    setItems([...items, { name: "", qty: 1, price: 0 }]);
  };

  // remove icon
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const itemNames = formData.getAll("itemName");
    const quantities = formData.getAll("qty");
    const prices = formData.getAll("price");

    const items = itemNames.map((name, index) => ({
      name,
      quantity: Number(quantities[index]),
      price: Number(prices[index]),
      total: Number(prices[index]) * Number(quantities[index]),
    }));
    const submitter = e.nativeEvent.submitter;
    const status = submitter.dataset.status;

    const invoiceData = objectCreater({
      createdAt: new Date().toISOString().split("T")[0],
      paymentDue: data.invoiceDate,
      description: data.projectDescription,
      paymentTerms: data.paymentTerms,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      status,
      senderStreet: data.senderStreet,
      senderCity: data.senderCity,
      senderPostCode: data.senderPostCode,
      senderCountry: data.senderCountry,
      street: data.streetAddress,
      city: data.city,
      postCode: data.postCode,
      country: data.country,
      items,
    });

    try {
      const response = await fetch("http://localhost:3000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });

      if (!response.ok) {
        throw new Error("Error while sending data to the server");
      }

      const result = await response.json();
    } catch (error) {
      console.error("ERROR");
    }
  }

  return (
    <div>
      <div className="drawer">
        <input
          ref={drawerRef}
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="btn bg-royalPurple hover:bg-softLavender dark:border-none rounded-3xl text-lightMist text-[14px]"
          >
            <IoIosAddCircleOutline className="w-7 h-7" />
            <div className="flex gap-1 ">
              <span>New</span>
              <span className="hidden lg:block ">Invoice</span>
            </div>
          </label>
        </div>
        <form
          ref={formRef}
          onSubmit={getFormData}
          className="drawer-side ml-[103px]"
        >
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu list-a text-base-content min-h-full w-[710px] p-0 dark:text-lightMist">
            {/* Sidebar content here */}
            <div className="max-w-3xl  list-a p-6 rounded-lg bg-lightMist dark:bg-midnightBlack  ">
              <h1 className="text-2xl font-bold mb-6 ">New Invoice</h1>

              {/* Bill From */}
              <h2 className="text-royalPurple font-semibold mb-2">Bill From</h2>
              <div className="">
                <FormInput
                  name="streetAddress"
                  type="text"
                  placaholder="19 Union Terrace"
                  mainName="Street Address"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 dark:text-lightMist">
                <FormInput
                  name="senderCity"
                  type="text"
                  placaholder="London"
                  mainName="City"
                />
                <FormInput
                  name="senderPostCode"
                  type="text"
                  placaholder="E1 3EZ"
                  mainName="Post Code"
                />
                <FormInput
                  name="senderCountry"
                  type="text"
                  placaholder="United Kingdom"
                  mainName="Country"
                />
              </div>

              {/* Bill To */}
              <h2 className="text-royalPurple font-semibold mt-6 mb-2">
                Bill To
              </h2>
              <FormInput
                name="clientName"
                type="text"
                placaholder="Alex Grim"
                mainName="Client’s Name"
              />
              <FormInput
                name="clientEmail"
                type="email"
                placaholder="alexgrim@mail.com"
                mainName="Clients Email"
              />
              <FormInput
                name="streetAddress"
                type="text"
                placaholder="84 Church Way"
                mainName="Street Address"
              />

              <div className="grid grid-cols-3 gap-4 mt-4">
                <FormInput
                  name="city"
                  type="text"
                  placaholder="Bradford"
                  mainName="City"
                />
                <FormInput
                  name="postCode"
                  type="text"
                  placaholder="BD1 9PB"
                  mainName="Post Code"
                />
                <FormInput
                  name="country"
                  type="text"
                  placaholder="United Kingdom"
                  mainName="Country"
                />
              </div>

              {/* Invoice Date & Payment Terms */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <FormInput
                  name="invoiceDate"
                  type="date"
                  mainName="Invoice Date"
                />
                <FormInput
                  name="paymentTerms"
                  type="text"
                  placaholder="Net 30 Days"
                  mainName="Payment Terms"
                />
              </div>

              <FormInput
                name="projectDescription"
                type="text"
                placaholder="Graphic Design"
                mainName="Project Description"
              />

              {/* Item List */}
              <h2 className="text-darkSlate dark:text-lightMist font-semibold mt-6 mb-2">
                Item List
              </h2>

              {items.length === 0 ? (
                <p className="text-steelBlue text-center">No item yet!</p>
              ) : (
                items.map((item, index) => (
                  <div key={index} className="flex  gap-4">
                    <FormInput
                      name="itemName"
                      type="text"
                      placeholder="Banner Design"
                      mainName="Item Name"
                    />
                    <FormInput
                      name="qty"
                      type="number"
                      placeholder="1"
                      mainName="Qty."
                    />
                    <FormInput
                      name="price"
                      type="number"
                      placeholder="156.00"
                      mainName="Price"
                    />

                    {/* <h3 className="mb-1">Total</h3> */}
                    {/* <span className="px-3 py-2 flex justify-between items-center text-gray-400">
                          {}
                        </span> */}
                    <button>
                      <MdOutlineDelete
                        className="text-3xl cursor-pointer mt-7 ml-2"
                        onClick={() => removeItem(index)}
                      />
                    </button>
                  </div>
                ))
              )}
              <button
                className="w-full btn bg-lightMist dark:bg-darkSlate dark:text-lightMist dark:border-none py-2 mt-4 rounded-lg"
                type="button"
                onClick={addNewItem}
              >
                + Add New Item
              </button>

              {/* Buttons */}
              <div className="pt-[30px] pb-[30px]">
                <div className="flex justify-between mt-6">
                  <button
                    className="btn bg-cloudBlue text-darkSlate py-2 px-6 rounded-full"
                    type="button"
                    onClick={handleDiscard}
                  >
                    Discard
                  </button>
                  <div className="flex gap-2">
                    <button
                      className="bg-darkSlate hover:bg-mutedBlue text-white py-2 px-6 rounded-full"
                      type="submit"
                      data-status="draft"
                    >
                      Save as Draft
                    </button>
                    <button
                      className="bg-royalPurple hover:bg-softLavender text-white py-2 px-6 rounded-full"
                      type="submit"
                      data-status="pending"
                    >
                      Save & Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default AddItemInvoice;
