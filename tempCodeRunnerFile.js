te.querySelector(".location-image").setAttribute("src", data[0].cities[0].imageUrl);
    locationTemplate.querySelector(".location-head").textContent = data[0].cities[0].name;
    locationTemplate.querySelector(".location-description").textContent = data[0].cities[0].description;
    document.getElem