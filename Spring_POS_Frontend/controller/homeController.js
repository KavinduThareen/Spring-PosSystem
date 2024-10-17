document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/Spring_POS_API/api/v1/items")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.category);
        const quantities = data.map((item) => item.qtyOnHand);

        renderChart(labels, quantities);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  function renderChart(labels, data) {
    const ctx = document.getElementById("myBarChart").getContext("2d");
    const myBarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Item Stock",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
});
