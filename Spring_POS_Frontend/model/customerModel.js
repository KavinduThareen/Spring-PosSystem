export async function getAllCustomers() {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/customers",
    method: "GET",
    dataType: "json",

    error: function (error) {
      console.log(error);
    },
  });
}

export function saveCustomer(customer) {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/customers",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(customer),

    success: function () {
      swal("Confirmation!", "Customer Saved Successfully!", "success");
    },

    error: function (error) {
      console.log(error);
    },
  });
}

export async function searchCustomer(customerId) {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/customers/" + customerId,
    method: "GET",
    dataType: "json",

    error: function (error) {
      swal("Warning!", "Customer not found!", "info");
    },
  });
}

export function updateCustomer(customerId, customer) {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/customers/" + customerId,
    method: "PATCH",
    contentType: "application/json",
    data: JSON.stringify(customer),

    success: function () {
      swal("Confirmation!", "Customer Update Successfully!", "success");
    },

    error: function (error) {
      console.log(error);
    },
  });
}

export function deleteCustomer(customerId) {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/customers/" + customerId,
    method: "DELETE",
    contentType: "application/json",

    success: function () {
      swal("Confirmation!", "Customer Delete Successfully!", "success");
    },

    error: function (error) {
      console.log(error);
    },
  });
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