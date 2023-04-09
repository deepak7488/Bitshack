// Get the context of the canvas element we want to select
var ctx = document.getElementById("myChart").getContext("2d");

// Define the data for the chart
var chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My Dataset",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            data: [10, 20, 30, 40, 50, 60, 70],
        },
    ],
};

// Create the chart
var myChart = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        unit: "month",
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    },
});
