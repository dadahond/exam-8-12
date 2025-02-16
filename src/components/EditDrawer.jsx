import FormInput from "./FormInput";
import { MdOutlineDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getOneData } from "../request/requestApi";

function EditDrawer() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [items, setItems] = useState([]);
  const drawerRef = useRef(null);
  const formRef = useRef(null);

  const handleReload = () => {
    window.location.reload();
  };

  const addNewItem = () => {
    setItems([...items, { id: Date.now(), name: "", qty: 1, price: 0.0 }]);
  };

  // remove icon
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const updateInvoice = async (e) => {
    e.preventDefault();
    const updatedData = {
      clientName: e.target.clientName.value,
      clientEmail: e.target.clientEmail.value,
      senderAddress: {
        street: e.target.senderStreet.value,
        city: e.target.senderCity.value,
        postCode: e.target.senderPostCode.value,
        country: e.target.senderCountry.value,
      },
      clientAddress: {
        street: e.target.streetAddressClient.value,
        city: e.target.city.value,
        postCode: e.target.postCode.value,
        country: e.target.country.value,
      },
      createdAt: e.target.invoiceDate.value,
      paymentTerms: e.target.paymentTerms.value,
      description: e.target.projectDescription.value,

      items,
    };

    try {
      const response = await fetch(`http://localhost:3000/data/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Ma'lumotni yangilashda xatolik!");
      }
      handleReload();
    } catch (error) {
      console.error(error);
      alert("Xatolik yuz berdi!");
    }
  };

  useEffect(() => {
    setLoading(true);
    getOneData(id)
      .then((res) => {
        setData(res);
        setItems(res.items);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <p className="m-auto flex items-center gap-2">
        Loading<span className="loading loading-dots loading-md"></span>
      </p>
    );

  const handleDiscard = () => {
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }
    if (formRef.current) {
      formRef.current.reset();
    }
    setItems([]);
  };

  return (
    <div className="drawer ">
      <input
        ref={drawerRef}
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        <label htmlFor="my-drawer">
          <span className="menu bg-lightMist dark:bg-darkSlate hover:bg-cloudBlue p-4 rounded-[50px] text-center cursor-pointer font-spartanBold font-bold">
            Edit
          </span>
        </label>
      </div>

      <form
        onSubmit={updateInvoice}
        ref={formRef}
        className="drawer-side ml-[95px]"
      >
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className=""
        ></label>
        <ul className="menu min-h-full w-1/2 p-4">
          <div className="max-w-3xl mx-auto p-4 rounded-lg bg-lightMist dark:bg-midnightBlack ">
            <h1 className="text-2xl font-bold mb-6">New Invoice</h1>
            <h2 className="text-purple-600 font-semibold mb-2">Bill From</h2>
            <FormInput
              name="senderStreet"
              type="text"
              mainName="Street Address"
              defaultValue={data?.senderAddress.street}
            />{" "}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <FormInput
                name="senderCity"
                type="text"
                defaultValue={data?.senderAddress.city}
                mainName="City"
              />
              <FormInput
                name="senderPostCode"
                type="text"
                defaultValue={data?.senderAddress.postCode}
                mainName="Post Code"
              />
              <FormInput
                name="senderCountry"
                type="text"
                defaultValue={data?.senderAddress.country}
                mainName="Country"
              />
            </div>
            <h2 className="text-purple-600 font-semibold mt-6 mb-2">Bill To</h2>
            <FormInput
              name="clientName"
              type="text"
              defaultValue={data?.clientName}
              mainName="Client’s Name"
            />
            <FormInput
              name="clientEmail"
              type="email"
              defaultValue={data?.clientEmail}
              mainName="Client’s Email"
            />
            <FormInput
              name="streetAddressClient"
              type="text"
              defaultValue={data?.clientAddress.street}
              mainName="Street Address"
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              <FormInput
                name="city"
                type="text"
                defaultValue={data?.clientAddress.city}
                mainName="City"
              />
              <FormInput
                name="postCode"
                type="text"
                defaultValue={data?.clientAddress.postCode}
                mainName="Post Code"
              />
              <FormInput
                name="country"
                type="text"
                defaultValue={data?.clientAddress.country}
                mainName="Country"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <FormInput
                name="invoiceDate"
                type="date"
                mainName="Invoice Date"
              />
              <FormInput
                name="paymentTerms"
                type="date"
                mainName="Payment Terms"
              />
            </div>
            <FormInput
              name="projectDescription"
              type="text"
              defaultValue={data?.description}
              mainName="Project Description"
            />
            <h2 className="text-steelBlue font-semibold mt-6 mb-2">
              Item List
            </h2>{" "}
            <div className="flex items-center gap-12">
              <p>Item Name</p>
              <p className="ml-[90px]">Qty</p>
              <p>Price</p>
              <p>Total</p>
            </div>
            {items.length === 0 ? (
              <p className="text-steelBlue text-center mt-5">
                Click to <span>Add New Item</span>
              </p>
            ) : (
              items.map((item, index) => (
                <div key={index} className="flex items-center py-2 gap-4">
                  <FormInput
                    name="itemName"
                    type="text"
                    placeholder="Banner Design"
                    className="p-4 rounded-md w-[200px]"
                    // mainName="Item Name"
                    value={item.name}
                    onChange={(e) =>
                      updateItem(item.id, "name", e.target.value)
                    }
                  />
                  <FormInput
                    value={item.qty}
                    onChange={(e) =>
                      updateItem(item.id, "qty", Number(e.target.value))
                    }
                    name="qty"
                    type="number"
                    placeholder="1"
                    className="p-4 rounded-md w-[55px] text-center"
                    min="1"
                    // mainName="Qty."
                  />
                  <FormInput
                    value={item.price}
                    onChange={(e) =>
                      updateItem(item.id, "price", Number(e.target.value))
                    }
                    name="price"
                    type="number"
                    placeholder="156.00"
                    className="p-4 rounded-md w-[55px] text-center"
                    min="0.1"
                    // mainName="Price"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="border-solid border-1 rounded-sm px-4 py-2 flex justify-between items-center text-gray-400">
                        {(item.qty * item.price).toFixed(2)}
                      </span>

                      <MdOutlineDelete
                        onClick={() => removeItem(index)}
                        className="text-3xl"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            <button
              onClick={addNewItem}
              type="button"
              className="btn w-full py-2 mt-4 rounded-lg text-darkSlate"
            >
              + Add New Item
            </button>
            <div className="flex justify-end mt-6">
              <div className="flex gap-2">
                <button
                  onClick={handleDiscard}
                  type="button"
                  className={`btn py-2 px-6 rounded-full text-darkSlate `}
                >
                  Cancel
                </button>
                <button
                  className="btn bg-royalPurple text-white py-2 px-6 rounded-full hover:bg-softLavender dark:border-none"
                  type="submit"
                  data-status="pending"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </ul>
      </form>
    </div>
  );
}

export default EditDrawer;
