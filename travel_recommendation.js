const dataURL = "travel_recommendation_api.json";
const destinations = ['beach', 'beaches', 'temple', 'temples']
const countryDestinations = ['australia', 'japan', 'brazil']

function contactUs() {
    let message = document.getElementById("contactResponse");
    let name = document.getElementsByClassName("nameInput");
    let email = document.getElementsByClassName("emailInput");

    if (message.value != null && message.value.trim() != "") {
        console.log("message found");
        message.value = "";
        name.value = "";
        email.value = "";
        //pretend I actually saved 

        popupVisibility(true);
    }

}

function popupVisibility(bool) {
    console.log(document.getElementById('popup').style.visibility);
    if (bool) {
        document.getElementById('popup').style.visibility = 'visible';
    }
    else {
        document.getElementById('popup').style.visibility = 'hidden';
    }
}

function clearSearch() {
    search = document.getElementById("searchInput");
    search.value = "";
}

function search() {
    const data = fetch(dataURL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('Data from API: ', data);
            processSearch(data);
        })
        .catch(error => {
            console.error('error:', error);
        })
    return data;
}

function processSearch(data) {
    var search = document.getElementById("searchInput")
    var processString = search.value.toLowerCase().trim();
    if (destinations.includes(processString) || countryDestinations.includes(processString)) {
        document.getElementById("location-list").replaceChildren();
        document.getElementById("main-home").style.display = "none";
        switch (processString) {
            case 'beach':
            case 'beaches':
                console.log("beach");
                createRecommendation(data.beaches);
                break;

            case 'temple':
            case 'temples':
                console.log("temple");
                createRecommendation(data.temples);
                break;

            default:
                console.log("country");
                data.countries.forEach(country => {
                    if (country.name.toLowerCase() == processString) {
                        countryRecommendation(country);
                    }
                })
                break;
        }
    }
    else {
        console.error("invalid input");
    }
}

//function inputs data into website
//utilizes templates for modular location box creation
function createRecommendation(data) {
    console.log(data);

    data.forEach(location => {
        var temp = document.getElementById("location-template").content;
        var locationTemplate = document.importNode(temp, true);
        locationTemplate.querySelector(".location-image").setAttribute("src", location.imageUrl);
        locationTemplate.querySelector(".location-head").textContent = location.name;
        locationTemplate.querySelector(".location-description").textContent = location.description;
        document.getElementById("location-list").appendChild(locationTemplate);
    });
}

function countryRecommendation(country) {
    console.log(country);

    country.cities.forEach(city => {
        console.log(city);

        var temp = document.getElementById("location-template").content;
        var cityTemplate = document.importNode(temp, true);
        cityTemplate.querySelector(".location-image").setAttribute("src", city.imageUrl);
        cityTemplate.querySelector(".location-head").textContent = city.name;
        cityTemplate.querySelector(".location-description").textContent = city.description;
        document.getElementById("location-list").appendChild(cityTemplate);
    });

}