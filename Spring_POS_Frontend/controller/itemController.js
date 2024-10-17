document.addEventListener("DOMContentLoaded", function () {
  reloadItems();
});

document.getElementById("add-item-btn").addEventListener("click", function () {
  const category = document.getElementById("item-category").value;
  const unitPrice = document.getElementById("price").value;
  const qtyOnHand = document.getElementById("qty").value;
  const expireDate = document.getElementById("ex-date").value;

  const itemData = {
    category: category,
    unitPrice: unitPrice,
    qtyOnHand: qtyOnHand,
    expireDate: expireDate,
  };

  saveItem(itemData).then(() => {
    reloadItems();
  });
});

document.getElementById("search-item-btn").addEventListener("click", async function () {
  const itemCode = document.getElementById("item-code").value;

  if (itemCode !== "") {
    try {
      const itemData = await searchItem(itemCode);
      document.getElementById("item-category").value = itemData.category;
      document.getElementById("price").value = itemData.unitPrice;
      document.getElementById("qty").value = itemData.qtyOnHand;
      document.getElementById("ex-date").value = itemData.expireDate;
    } catch (error) {
      console.error("Error fetching item data:", error);
    }
  } else {
    swal("Warning!", "Item Id Required", "info");
  }
});

document.getElementById("update-item-btn").addEventListener("click", function () {
  const itemCode = document.getElementById("item-code").value;

  if (itemCode !== "") {
    const category = document.getElementById("item-category").value;
    const unitPrice = document.getElementById("price").value;
    const qtyOnHand = document.getElementById("qty").value;
    const expireDate = document.getElementById("ex-date").value;

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
        updateItem(itemCode, itemData).then(() => {
          reloadItems();
        });
      }
    });
  } else {
    swal("Warning!", "Item Id Required", "info");
  }
});

document.getElementById("delete-item-btn").addEventListener("click", function () {
  const itemCode = document.getElementById("item-code").value;

  if (itemCode !== "") {
    swal({
      title: "Are you sure?",
      text: "Do you want to delete this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteItem(itemCode).then(() => {
          reloadItems();
        });
      }
    });
  } else {
    swal("Warning!", "Item Id Required", "info");
  }
});

function loadItemTable(itemList) {
  const table = document.getElementById("item-table");
  table.innerHTML = ""; // Clear previous table data
  itemList.forEach(function (item) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.itemCode}</td>
      <td>${item.category}</td>
      <td>${item.unitPrice}</td>
      <td>${item.qtyOnHand}</td>
      <td>${item.registerDate}</td>
      <td>${item.expireDate}</td>
    `;

    table.appendChild(row);
  });
}

function loadItemCode(itemCodes) {
  const itemCodeDropdown = document.getElementById("item-code");
  itemCodeDropdown.innerHTML = '<option value="">Search,Update or Delete Item</option>';

  itemCodes.forEach(function (code) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = code;
    itemCodeDropdown.appendChild(option);
  });
}

async function reloadItems() {
  try {
    document.getElementById("price").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("ex-date").value = "";

    const itemList = await getAllItems();
    loadItemTable(itemList);
    loadItemCode(itemList.map((item) => item.itemCode));
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}
