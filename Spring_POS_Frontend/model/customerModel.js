export async function getAllCustomers() {
  try {
    const response = await fetch("http://localhost:8080/Spring_POS_API/api/v1/customers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
}

export async function saveCustomer(customer) {
  try {
    const response = await fetch("http://localhost:8080/Spring_POS_API/api/v1/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    if (response.ok) {
      swal("Confirmation!", "Customer Saved Successfully!", "success");
    }
  } catch (error) {
    console.error("Error saving customer:", error);
  }
}

export async function searchCustomer(customerId) {
  try {
    const response = await fetch(`http://localhost:8080/Spring_POS_API/api/v1/customers/${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      swal("Warning!", "Customer not found!", "info");
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching customer:", error);
  }
}

export async function updateCustomer(customerId, customer) {
  try {
    const response = await fetch(`http://localhost:8080/Spring_POS_API/api/v1/customers/${customerId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    if (response.ok) {
      swal("Confirmation!", "Customer Updated Successfully!", "success");
    }
  } catch (error) {
    console.error("Error updating customer:", error);
  }
}

export async function deleteCustomer(customerId) {
  try {
    const response = await fetch(`http://localhost:8080/Spring_POS_API/api/v1/customers/${customerId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      swal("Confirmation!", "Customer Deleted Successfully!", "success");
    }
  } catch (error) {
    console.error("Error deleting customer:", error);
  }
}

export function validateCustomer(customer) {
  const cusNamePattern = /^[A-Za-z\s]+$/;
  const addressPattern = /^[A-Za-z0-9\s,.'-]+$/;
  const cusMobilePattern = /^\d{10}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isCusFirstNameValid = cusNamePattern.test(customer.firstName);
  const isCusSecondNameValid = cusNamePattern.test(customer.lastName);
  const isAddressValid = addressPattern.test(customer.address);
  const isCusMobileValid = cusMobilePattern.test(customer.mobile);
  const isEmailValid = emailPattern.test(customer.email);

  if (!isCusFirstNameValid) {
    swal({
      title: "Warning!",
      text: "Invalid Customer First Name!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  if (!isCusSecondNameValid) {
    swal({
      title: "Warning!",
      text: "Invalid Customer Second Name!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  if (!isAddressValid) {
    swal({
      title: "Warning!",
      text: "Invalid Customer Address!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  if (!isCusMobileValid) {
    swal({
      title: "Warning!",
      text: "Invalid Mobile Number!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  if (!isEmailValid) {
    swal({
      title: "Warning!",
      text: "Invalid Email Address!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  return true;
}
