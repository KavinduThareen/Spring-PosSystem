import {
  getAllCustomers,
  saveCustomer,
  searchCustomer,
  updateCustomer,
  deleteCustomer,
  validateCustomer,
} from "../model/customerModel.js";

document.addEventListener("DOMContentLoaded", function () {
  reloadCustomer();
});

document.getElementById("add-customer-btn").addEventListener("click", function () {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const address = document.getElementById("address").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;

  const customerData = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    mobile: mobile,
    email: email,
  };

  if (checkValidation()) {
    const promise = saveCustomer(customerData);
    promise.then(() => {
      reloadCustomer();
    });
  }
});

document.getElementById("search-customer-btn").addEventListener("click", async function () {
  const customerId = document.getElementById("customer-id").value;

  if (customerId !== "") {
    try {
      const customerData = await searchCustomer(customerId);
      document.getElementById("first-name").value = customerData.firstName;
      document.getElementById("last-name").value = customerData.lastName;
      document.getElementById("address").value = customerData.address;
      document.getElementById("mobile").value = customerData.mobile;
      document.getElementById("email").value = customerData.email;
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  } else {
    alert("Customer Id Required");
  }
});

document.getElementById("update-customer-btn").addEventListener("click", function () {
  const customerId = document.getElementById("customer-id").value;

  if (customerId !== "") {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const address = document.getElementById("address").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;

    const customerData = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      mobile: mobile,
      email: email,
    };

    if (confirm("Do you want to update this customer?")) {
      if (checkValidation()) {
        const promise = updateCustomer(customerId, customerData);
        promise.then(() => {
          reloadCustomer();
        });
      }
    }
  } else {
    alert("Customer Id Required");
  }
});

document.getElementById("delete-customer-btn").addEventListener("click", function () {
  const customerId = document.getElementById("customer-id").value;

  if (customerId !== "") {
    if (confirm("Do you want to delete this customer?")) {
      const promise = deleteCustomer(customerId);
      promise.then(() => {
        reloadCustomer();
      });
    }
  } else {
    alert("Customer Id Required");
  }
});

function loadCustomerTable(customerList) {
  const tableBody = document.getElementById("customer-table");
  tableBody.innerHTML = "";
  customerList.forEach(function (customer) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${customer.customerId}</td>
      <td>${customer.name}</td>
      <td>${customer.address}</td>
      <td>${customer.email}</td>
      <td>${customer.mobile}</td>
      <td>${customer.lastUpdatedAt}</td>
    `;

    tableBody.appendChild(row);
  });
}

function loadCustomerId(customerIds) {
  const customerId = document.getElementById("customer-id");
  customerId.innerHTML = '<option value="">Search, Update or Delete Customer</option>';

  customerIds.forEach(function (id) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = id;
    customerId.appendChild(option);
  });
}

async function reloadCustomer() {
  try {
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("email").value = "";

    const customerList = await getAllCustomers();
    loadCustomerTable(customerList);
    loadCustomerId(customerList.map(customer => customer.customerId));
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
}

function checkValidation() {
  const customer = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    address: document.getElementById("address").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
  };
  return validateCustomer(customer);
}
