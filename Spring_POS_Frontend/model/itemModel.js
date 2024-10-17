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

export async function saveItem(item) {
  try {
    const response = await fetch("http://localhost:8080/Spring_POS_API/api/v1/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      swal("Confirmation!", "Item Saved Successfully!", "success");
    }
  } catch (error) {
    console.error("Error saving item:", error);
  }
}

export async function searchItem(itemCode) {
  try {
    const response = await fetch(`http://localhost:8080/Spring_POS_API/api/v1/items/${itemCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      swal("Warning!", "Item not found!", "info");
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching item:", error);
  }
}

export async function updateItem(itemCode, item) {
  try {
    const response = await fetch(`http://localhost:8080/Spring_POS_API/api/v1/items/${itemCode}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      swal("Confirmation!", "Item Updated Successfully!", "success");
    }
  } catch (error) {
    console.error("Error updating item:", error);
  }
}

export async function deleteItem(itemCode) {
  try {
    const response = await fetch(`http://localhost:8080/Spring_POS_API/api/v1/items/${itemCode}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      swal("Confirmation!", "Item Deleted Successfully!", "success");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}
