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

export function placeOrder(orderData) {
    console.log(orderData);
    
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/orders",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(orderData),

    success: function () {
      swal("Success!", "Your order has been placed successfully.", "success");
    },

    error: function (error) {        
      swal(
        "Error!",
        "There was an issue placing your order. Please try again.",
        "error"
      );
    },
  });
}
