
//load data
var ctxLifeExpectancy = document.getElementById("life_expectancy").getContext('2d');
var selectCountryLifeExpectancy = document.getElementById("selectCountryLifeExpectancy");


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

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

var countryColorDict = {}

d3.csv("./assets/life_expectancy.csv", function(data) {
    //do transformations here
    //create arrays for X and Y yAxes
    var countries = []

    for(var i = 0; i < data.length; i++){
        // if !countries.includes(data[i]['Country']):
        countries.push(data[i]['Country'])
        countryColorDict[data[i]['Country']] = getRandomColor()
    }

    //add countries to dropdown menu
    for(var i=0; i<countries.length; i++) {
        var opt = countries[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectCountryLifeExpectancy.appendChild(el);
    }

});


//create a dictionary and assign random color to each country
default_values = ['India', 'China', 'France', 'Germany', 'Yemen']

showSelectedCountryDataForLifeExpectancy(default_values)
function showSelectedCountryDataForLifeExpectancy(default_values){
    selectedCountries = []
    if(default_values.length == 0){
        var selectedCountriesObjects = Array.prototype.slice.call(selectCountryLifeExpectancy.selectedOptions);
        var selectedCountries = [];
        for(var i =0; i<selectedCountriesObjects.length; i++){
            selectedCountries.push(selectedCountriesObjects[i].value)
        }
    }
    else{
        selectedCountries = default_values
    }
    console.log(selectedCountries)
    d3.csv("./assets/life_expectancy.csv", function(data) {
        //do transformations here
        //create arrays for X and Y yAxes
        var years = [2000, 2010, 2015, 2019]
        var lifeExpectancy = []
        var countries = []
        for(var i = 0; i < data.length; i++){
            if(selectedCountries.includes(data[i]['Country'])){
                countries.push(data[i]['Country'])
                lifeExpectancy.push([data[i]['2000'], data[i]['2010'], data[i]['2015'], data[i]['2019']]);
            }
            
        }
        datasets = []
        for(var i =0; i<countries.length; i++){
            var obj = {
                label: countries[i],
                data: lifeExpectancy[i],
                fill: false,
                borderColor: countryColorDict[countries[i]],
            }
            datasets.push(obj)
        }
        var myChart = new Chart(ctxLifeExpectancy, {
            type: 'line',
            data: {
                labels: years,
                datasets: datasets,
            },
            options: {
                title: {
                    display: true,
                    text: "Life Expectancy over the years",
                },
                legend: {
                    display: true
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Life Expectancy (in years)",
                        },
                        ticks: {
                            min: 40,
                            max: 90,
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Years"
                        }
                    }]
                }
            }
        });


    });
    default_values = []
}

showBarLifeExpectancy()
function showBarLifeExpectancy(){
    year = document.getElementById("selectYearLifeExpectancy").selectedOptions[0]
    order = document.getElementById("selectOrderLifeExpectancy").selectedOptions[0]
    bar_chart_ctx = document.getElementById("life_expectancy_bar_chart").getContext('2d');
    d3.csv("./assets/life_expectancy.csv", function(data) {
        //do transformations here
        //create arrays for X and Y yAxes
        var lifeExpectancy = []
        var countries = []
        console.log(year)
        for(var i = 0; i < data.length; i++){
            if(!countries.includes(data[i]['Country'])){
                countries.push(data[i]['Country']);
                lifeExpectancy.push(data[i][parseInt(year.value)]);
            }
        }
        
        console.log(countries)
        //select top 20
        if(order.value == "Top 20"){
            lifeExpectancy, countries = sortLists(lifeExpectancy, countries, -1)
        }
        else{
            lifeExpectancy, countries = sortLists(lifeExpectancy, countries, 1)
        }

        lifeExpectancy = lifeExpectancy.slice(0,20)
        countries = countries.slice(0,20)

        console.log(lifeExpectancy)
        console.log(countries)

        datasets = [{
            data: lifeExpectancy,
            fill: true,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor()
        }]
        
        var myChart = new Chart(bar_chart_ctx, {
            type: 'horizontalBar',
            data: {
                labels: countries,
                datasets: datasets,
            },
            options: {
                title: {
                    display: true,
                    text: "Life expectancy in various countries in "+year.value,
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "countries",
                        },
                        
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Life expectancy at birth (in years)",
                        },
                        ticks: {
                            min: 40,
                            max: 80,
                        }
                    }]
                }
            }
        });


    });
}
//write desciption about life expectancy at birth
//area chart for life expectancy summarizing all the trend for all the countries would be nice


