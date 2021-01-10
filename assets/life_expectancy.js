
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

//write desciption about life expectancy at birth
//area chart for life expectancy summarizing all the trend for all the countries would be nice


