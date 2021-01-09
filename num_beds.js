//load data
var X = [];
var Y = [];
// var flag = null;
var ctx = document.getElementById("num_beds").getContext('2d');
d3.csv("https://raw.githubusercontent.com/gayanehvardanyan/Visual-Analytics-Project/main/assets/num_beds.csv", function (data) {
    //do transformations here
    //create arrays for X and Y yAxes
    var X = [];
    var Y = [];
    for (var i = 0; i < data.length; i++) {
        X.push(String(data[i].LOCATION))
        Y.push(parseFloat(data[i].Value))
    }
    // flag = 1;
    // document.write(JSON.stringify(X))
    // document.write(JSON.stringify(Y))

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: X,
            datasets: [{
                label: 'Number of beds in Hospital per 1000 people',
                data: Y,
                borderWidth: 1,
                backgroundColor: "#48426d"
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    },
                }]
            }
        }
    });


});

//To do: descending order, darker colors, time slider, full country names