import {
  getAllCustomers,
  getAllItems,
  placeOrder,
} from "../model/orderModel.js";

$(document).ready(function () {
  loadCustomerMobiles();
  loadItemCategories();

  $("#cus-mobile").change(function () {
    const selectedMobile = $(this).val();
    if (selectedMobile) {
      autoFillCustomerDetails(selectedMobile);
    } else {
      $("#cus-id").val("");
      $("#cus-name").val("");
    }
  });

  $("#item-category").change(function () {
    const selectedItem = $(this).val();
    if (selectedItem) {
      autoFillItemDetails(selectedItem);
    } else {
      $("#item-price").val("");
    }
  });
});

async function loadCustomerMobiles() {
  try {
    const customerList = await getAllCustomers();
    const cusMobile = $("#cus-mobile");
    cusMobile.empty();
    cusMobile.append('<option value="">Select Customer Mobile</option>');

    customerList.forEach(function (customer) {
      cusMobile.append(
        `<option value="${customer.mobile}">${customer.mobile}</option>`
      );
    });

    window.customers = customerList;
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
}

function autoFillCustomerDetails(mobile) {
  const selectedCustomer = window.customers.find(
    (customer) => customer.mobile == mobile
  );

  if (selectedCustomer) {
    $("#cus-id").val(selectedCustomer.customerId);
    $("#cus-name").val(selectedCustomer.name);
  }
}

async function loadItemCategories() {
  try {
    const itemList = await getAllItems();
    const itemCategory = $("#item-category");
    itemCategory.empty();
    itemCategory.append('<option value="">Select Item Category</option>');

    itemList.forEach(function (item) {
      itemCategory.append(
        `<option value="${item.category}" data-item-code="${item.itemCode}">${item.category}</option>`
      );
    });

    window.items = itemList;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

function autoFillItemDetails(category) {
  const selectedItem = window.items.find((item) => item.category == category);

  if (selectedItem) {
    $("#item-price").val(selectedItem.unitPrice);
    $("#item-qty").attr(
      "Placeholder",
      "Available quantity is: " + selectedItem.qtyOnHand
    );
  }
}

const addedItems = [];

$("#add-item-btn").click(function () {
  const customer = $("#cus-mobile").val();
  const category = $("#item-category").val();
  const selectedItemCode = $("#item-category option:selected").data(
    "item-code"
  );
  const unitPrice = parseFloat($("#item-price").val());
  const qty = parseInt($("#item-qty").val());

  if (customer && category && unitPrice && qty) {
    const totalPrice = unitPrice * qty;
    const item = {
      itemCode: selectedItemCode,
      category,
      unitPrice,
      qty,
      totalPrice,
    };
    addedItems.push(item);

    $("#added-items-table tbody").append(`
      <tr>
        <td>${category}</td>
        <td>${unitPrice.toFixed(2)}</td>
        <td>${qty}</td>
        <td>${totalPrice.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm remove-item-btn">Remove</button></td>
      </tr>
    `);

    $("#item-category").val("");
    $("#item-price").val("");
    $("#item-qty").val("");
  } else {
    swal("Warning!", "Please fill all item details!", "info");
  }
});

$(document).on("click", ".remove-item-btn", function () {
  swal({
    title: "Are you sure?",
    text: "Do you want to remove this item!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willRemove) => {
    if (willRemove) {
      const rowIndex = $(this).closest("tr").index();
      addedItems.splice(rowIndex, 1);
      $(this).closest("tr").remove();
    }
  });
});

$("#submit-order-btn").click(async function () {
  const customerId = $("#cus-id").val();
  const customerName = $("#cus-name").val();
  const customerMobile = $("#cus-mobile").val();
  const dateTime = new Date().toLocaleString();

  let itemsHtml = "";
  let totalAmount = 0;
  addedItems.forEach((item) => {
    itemsHtml += `<p>${item.category} - ${item.unitPrice.toFixed(2)} x ${
      item.qty
    } = ${item.totalPrice.toFixed(2)}</p>`;
    totalAmount += item.totalPrice;
  });

  const unitPriceAndQuantity = addedItems
    .map((item) => `${item.unitPrice.toFixed(2)} x ${item.qty}`)
    .join(", ");

  $("#modal-customer-id").text(customerId);
  $("#modal-customer-name").text(customerName);
  $("#modal-mobile").text(customerMobile);
  $("#modal-date-time").text(dateTime);
  $("#modal-items-list").html(itemsHtml);
  $("#modal-unit-price").text(unitPriceAndQuantity);
  $("#modal-total-amount").text(totalAmount.toFixed(2));

  $("#orderDetailsModal").modal("show");
});

$("#place-order-btn").click(function () {
  const customerId = $("#cus-id").val();
  const paymentMethod = $("#pay-method").val();

  const orderDetails = addedItems.map((item) => ({
    itemCode: item.itemCode,
    qty: item.qty,
    unitPrice: item.unitPrice,
  }));

  const orderData = {
    customerId: customerId,
    orderDetails: orderDetails,
    paymentMethod: paymentMethod,
  };

  if (paymentMethod != "") {
    placeOrder(orderData);
  } else {
    swal("Warning!", "Please fill the payment method!", "info");
    return;
  }
});
