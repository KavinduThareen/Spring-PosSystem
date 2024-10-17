$(document).ready(function () {
  $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/items",
    method: "GET",
    dataType: "json",

    success: function (response) {
      const labels = response.map((item) => item.category);
      const data = response.map((item) => item.qtyOnHand);

      renderChart(labels, data);
    },
    error: function (error) {
      console.log(error);
    },
  });

  function renderChart(labels, data) {
    var ctx = document.getElementById("myBarChart").getContext("2d");
    var myBarChart = new Chart(ctx, {
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
