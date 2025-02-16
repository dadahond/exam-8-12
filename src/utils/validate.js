export function validate(data) {
  if (data.senderAddress?.street?.trim() == "") {
    return {
      target: "senderStreet",
      message: "Enter the sender's street address",
    };
  }

  if (data.senderAddress?.city?.trim() == "") {
    return {
      target: "senderCity", 
      message: "Enter the sender's city",
    };
  }

  if (data.senderAddress?.postCode?.trim() == "") {
    return {
      target: "senderPostCode",
      message: "Enter the sender's postal code",
    };
  }

  if (data.senderAddress?.country?.trim() == "") {
    return {
      target: "senderCountry",
      message: "Enter the sender's country",
    };
  }

  if (data.clientName?.trim() == "")
    return { target: "clientName", message: "Enter the client's name" };

  if (data.clientEmail?.trim() == "")
    return { target: "clientEmail", message: "Enter the client's email" };

  if (data.clientAddress?.street?.trim() == "") {
    return {
      target: "streetAddress",
      message: "Enter the client's street address",
    };
  }

  if (data.clientAddress?.city?.trim() == "") {
    return { target: "city", message: "Enter the client's city" };
  }

  if (data.clientAddress?.postCode?.trim() == "") {
    return { target: "postCode", message: "Enter the client's postal code" };
  }

  if (data.clientAddress?.country?.trim() == "") {
    return { target: "country", message: "Enter the client's country" };
  }

  if (!data.paymentDue)
    return {
      target: "invoiceDate",
      message: "Enter the invoice date",
    };

  if (data.description?.trim() == "")
    return {
      target: "projectDescription",
      message: "Enter the project description",
    };

  return false;
}
