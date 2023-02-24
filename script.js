document.title="Rest Countries & Weather Using Fetch"
const container = document.createElement("div")
container.classList.add("container")
const title = document.createElement("h1")
title.id="title"
title.classList.add("text-center")
const titled = document.createTextNode("Country Weather App")
title.appendChild(titled)
container.appendChild(title)
const rowdiv = document.createElement("div")
rowdiv.classList.add("row")
rowdiv.id="countrydata"
container.appendChild(rowdiv)
document.body.appendChild(container)
let rowdiv1 = document.getElementById("countrydata")
async function getCountryData(){
    try{
        let res = await fetch("https://restcountries.com/v2/all")
        let data = await res.json()
        displayCountryData(data)
    }
    catch(err){
        console.log(err)
    }
} 
getCountryData()
function displayCountryData(data){
  //  console.log(data)
    data.map((element)=>{
        if(element.latlng == "undefined"){
            console.log(element)
        }
        rowdiv1.innerHTML+=`
            <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
            <div class="card h-100 text-center text-bg-dark">
                <div class="card-header d-inline-flex align-items-center justify-content-center">
                    <h1 class="fs-4">${element.name}</h1>
                </div>
                <div class="card-img grad">
                    <img class="card-img-top p-3 pt-4 pb-0" src="${element.flags.svg}" alt="${element.name}">
                </div>
                <div class="card-body grad">
                    <div class="card-text">
                        <h3 class="fs-5">Capital : ${element.capital}</h3>
                        <h3 class="fs-5">Region : ${element.region}</h3>
                        <h3 class="fs-5">Country Code : ${element.alpha3Code}</h3>
                        <h3 class="fs-5">LatLng : ${element.latlng}</h3>
                        <div class="btn btn-primary mb-4 grad p-1" onclick="getCityWeatherLatLon(${element.latlng})" data-bs-toggle="modal" data-bs-target="#displayWeatherModal">Click For Weather</div>
                    </div>
                </div>
            </div>
            </div>`
    })
}

async function getCityWeatherLatLon(lat,lon){
    console.log(lat,lon)
    try{
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0e3471fe288a457b9f253be31b12caee&units=metric`)
        let weatherData = await res.json()
        console.log(weatherData)
        displayWeatherData(weatherData)
    }
    catch(err){
        console.log(err)
    }
} 

function displayWeatherData(data){

    const myModal = document.getElementById('displayWeatherModal')
    const displayWeatherModalLabel = document.getElementById('displayWeatherModalLabel')
    displayWeatherModalLabel.innerText=data.name
    const modalBody = document.getElementById("modalBody")
    let displayData =`<h1 class="w-100 text-center">`
    if(data.weather[0].description=="broken clouds") displayData+=`<i class="fa-solid fa-cloud"></i>`
    else if(data.weather[0].description=="scattered clouds") displayData+=`<i class="fa-regular fa-clouds-sun"></i>`
    else if(data.weather[0].description=="few clouds") displayData+=`<i class="fa-solid fa-cloud-sun"></i>`
    else if(data.weather[0].description=="clear sky") displayData+=`<i class="fa-solid fa-sun-bright"></i>`
    else if(data.weather[0].description=="shower rain") displayData+=`<i class="fa-solid fa-cloud-showers-heavy"></i>`
    else if(data.weather[0].description=="rain") displayData+=`<i class="fa-solid fa-raindrops"></i>`
    else if(data.weather[0].description=="thunderstorm") displayData+=`<i class="fa-regular fa-cloud-bolt"></i>`
    else if(data.weather[0].description=="snow") displayData+=`<i class="fa-solid fa-snowflake"></i>`
    else if(data.weather[0].description=="mist") displayData+=`<i class="fa-regular fa-cloud-fog"></i>`
    else displayData+=`<i class="fa-regular fa-cloud-sun-rain"></i>`
     displayData += `</h1>
        <p class="text-center fs-6"><i class="fa-solid fa-temperature-high"></i>Temp : ${data.main.temp}</p>
        <p class="text-center fs-6">Feels Like :${data.main.feels_like}</p>
        <p class="text-center fs-6">Weather : ${data.weather[0].main}</p>
        <p class="text-center fs-6">Weather : ${data.weather[0].description}</p>
    `
    modalBody.innerHTML=displayData

}
