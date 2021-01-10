//number of hospital beds per 10,000 

var ctxNumBeds = document.getElementById("num_beds").getContext('2d');

showSelectedCountryDataForBeds({value: "2018"})

function sortLists(X, Y, ascending){
    //sort both lists in descending order based on X
    //assum X and Y are of same length
    //ascending is either 1 or -1
    sortDict = {}
    for(var i=0; i<X.length; i++){
        sortDict[X[i]] = []
    }
    for(var i=0; i<X.length; i++){
        sortDict[X[i]].push(Y[i])
    }
    sortedX = X.sort(function(a,b){return ascending*(a-b)})
    sortedY = []
    lastX = null
    for(var i=0; i<sortedX.length; i++){
        if(sortedX[i] != lastX){
            sortedY = sortedY.concat(sortDict[sortedX[i]])
        }
        lastX = sortedX[i]
    }
    return sortedX, sortedY
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function showSelectedCountryDataForBeds(year){

    var selectedYear = year.value
    console.log(selectedYear)

    d3.csv("./assets/hospital_beds.csv", function(data) {

        var year = selectedYear;
        var X = [] //list of countries
        var Y = [] //list of num of beds
        for(var i = 0; i < data.length; i++){
            // country = data[i]['Location']
            // year = data[i]['Period']
            if(year == data[i]['Period']){
                X.push(data[i]['Location'])
                Y.push(data[i]['FactValueForMeasure'])
            }
        }
        Y, X = sortLists(Y, X, -1)
        console.log(X)
        console.log(Y)
        datasets = [{
            data: Y,
            fill: true,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor()
        }]
        
        var myChart = new Chart(ctxNumBeds, {
            type: 'bar',
            data: {
                labels: X,
                datasets: datasets,
            },
            options: {
                title: {
                    display: true,
                    text: "Number of beds in hospital per 10,000 population in "+year,
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Number of beds (per 10,000)",
                        },
                        ticks: {
                            min: 0,
                            max: 130,
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: false,
                            labelString: "Countries"
                        }
                    }]
                }
            }
        });


    });
}

//write desciption about this indicator


