export async function getAllItems() {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/items",
    method: "GET",
    dataType: "json",

    error: function (error) {
      console.log(error);
    },
  });
}

export function saveItem(item) {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/items",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(item),

    success: function () {
      swal("Confirmation!", "Item Saved Successfully!", "success");
    },

    error: function (error) {
      console.log(error);
    },
  });
}

export async function searchItem(itemCode) {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/items/" + itemCode,
    data: "GET",
    dataType: "json",

    error: function (error) {
      swal("Warning!", "Item not found!", "info");
    },
  });
}

export function updateItem(itemCode, item) {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/items/" + itemCode,
    method: "PATCH",
    contentType: "application/json",
    data: JSON.stringify(item),

    success: function () {
      swal("Confirmation!", "Item Update Successfully!", "success");
    },

    error: function (error) {
      console.log(error);
    },
  });
}

export function deleteItem(itemCode) {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/items/" + itemCode,
    method: "DELETE",
    contentType: "application/json",

    success: function () {
      swal("Confirmation!", "Item Delete Successfully!", "success");
    },

    error: function (error) {
      console.log(error);
    },
  });
}