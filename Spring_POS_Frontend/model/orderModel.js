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

export async function getAllItems() {
  try {
    const response = await fetch("http://localhost:8080/Spring_POS_API/api/v1/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

export async function placeOrder(orderData) {
  try {
    console.log(orderData);

    const response = await fetch("http://localhost:8080/Spring_POS_API/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      swal("Success!", "Your order has been placed successfully.", "success");
    } else {
      throw new Error("Failed to place order");
    }
  } catch (error) {
    swal(
        "Error!",
        "There was an issue placing your order. Please try again.",
        "error"
    );
    console.error("Error placing order:", error);
  }
}
