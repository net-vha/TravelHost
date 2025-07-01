const dataURL = "travel_recommendation_api.json";
const destinations = ['beach', 'beaches', 'temple', 'temples', 'country', 'countries']

function contactUs() {
    let message = document.getElementById("contactResponse");
    let name = document.getElementsByClassName("nameInput");
    let email = document.getElementsByClassName("emailInput");

    if(message.value != null && message.value.trim() != ""){
        console.log("message found");
        message.value = "";
        name.value = "";
        email.value = "";
        //pretend I actually saved 

        popupVisibility(true);
    }

}

function popupVisibility(bool){
    console.log(document.getElementById('popup').style.visibility);
    if(bool){
        document.getElementById('popup').style.visibility = 'visible';
    }
    else{
        document.getElementById('popup').style.visibility = 'hidden';
    }
}

function clearSearch(){
    search = document.getElementById("searchInput");
    search.value = "";
}

function search(){
    const data =  fetch(dataURL)
        .then(response => {
            return response.json();
        })
        .then(data =>{
            console.log('Data from API: ', data);
            processSearch(data);
        })
        .catch(error => {
            console.error('error:', error);
        })
    return data;
}

function processSearch(data){
    var search = document.getElementById("searchInput")
    var processString = search.value.toLowerCase().trim();
    if(destinations.includes(processString)){
        switch(processString){
            case 'beach':
            case 'beaches':
                console.log("beach");
                console.log(data.beaches[0].imageUrl);
                break;

            case 'temple':
            case 'temples':
                console.log("temple");
                console.log(data.temples);
                break;

            case 'country':
            case 'countries':
                console.log("country");
                console.log(data.countries[0].cities[0].imageUrl);
                //document.getElementById("testImg").setAttribute("src","..\\images\\sydney-opera-house-363244_1280.jpg")
                break;
        }
    }
    else{
        console.error("invalid input");
    }
}