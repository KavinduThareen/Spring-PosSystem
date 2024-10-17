import {
  getAllItems,
  saveItem,
  searchItem,
  updateItem,
  deleteItem,
} from "../model/itemModel.js";

$(document).ready(function () {
  reloadItems();
});

$("#add-item-btn").click(function () {
  const category = $("#item-category").val();
  const unitPrice = $("#price").val();
  const qtyOnHand = $("#qty").val();
  const expireDate = $("#ex-date").val();

  const itemData = {
    category: category,
    unitPrice: unitPrice,
    qtyOnHand: qtyOnHand,
    expireDate: expireDate,
  };

  const promise = saveItem(itemData);
  promise.then(() => {
    reloadItems();
  });
});

$("#search-item-btn").click(async function () {
  const itemCode = $("#item-code").val();

  if (itemCode != "") {
    try {
      const itemData = await searchItem(itemCode);
      $("#item-category").val(itemData.category);
      $("#price").val(itemData.unitPrice);
      $("#qty").val(itemData.qtyOnHand);
      $("#ex-date").val(itemData.expireDate);
    } catch (error) {
      console.error("Error fetching item data:", error);
    }
  } else {
    swal("Warning!", "Item Id Required", "info");
  }
});

$("#update-item-btn").click(function () {
  const itemCode = $("#item-code").val();

  if (itemCode != "") {
    const category = $("#item-category").val();
    const unitPrice = $("#price").val();
    const qtyOnHand = $("#qty").val();
    const expireDate = $("#ex-date").val();

    const itemData = {
      category: category,
      unitPrice: unitPrice,
      qtyOnHand: qtyOnHand,
      expireDate: expireDate,
    };

    swal({
      title: "Are you sure?",
      text: "Do you want to update this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willUpdate) => {
      if (willUpdate) {
        const promise = updateItem(itemCode, itemData);
        promise.then(() => {
          reloadItems();
        });
      }
    });
  } else {
    swal("Warning!", "Item Id Required", "info");
  }
});

$("#delete-item-btn").click(function () {
  const itemCode = $("#item-code").val();

  if (itemCode !== "") {
    swal({
      title: "Are you sure?",
      text: "Do you want to delete this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const promise = deleteItem(itemCode);
        promise.then(() => {
          reloadItems();
        });
      }
    });
  } else {
    swal("Warning!", "Item Id Required", "info");
  }
});

function loadItemTable(itemList) {
  $("#item-table").empty();
  itemList.forEach(function (item) {
    $(".table").append(
      "<tr> " +
        "<td>" +
        item.itemCode +
        "</td>" +
        "<td>" +
        item.category +
        "</td>" +
        "<td>" +
        item.unitPrice +
        "</td>" +
        "<td>" +
        item.qtyOnHand +
        "</td>" +
        "<td>" +
        item.registerDate +
        "</td>" +
        "<td>" +
        item.expireDate +
        "</td>" +
        "</tr>"
    );
  });
}

function loadItemCode(itemCodes) {
  const itemCode = $("#item-code");
  itemCode.empty();
  itemCode.append('<option value="">Search,Update or Delete Item</option>');

  itemCodes.forEach(function (code) {
    itemCode.append(`<option value="${code}">${code}</option>`);
  });
}

async function reloadItems() {
  try {
    $("#price").val("");
    $("#qty").val("");
    $("#ex-date").val("");
    const itemList = await getAllItems();
    loadItemTable(itemList);
    loadItemCode(itemList.map((item) => item.itemCode));
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}
