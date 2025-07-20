let searchInput = document.getElementById("searchbar");
let submitButton = document.getElementById("submit");

let cityNameEl = document.getElementById("cityname");
let tempEl = document.getElementById("temperature");
let commentEl = document.getElementById("quirkyquote");
function getQuote(description) {
    description = description.toLowerCase();
    if (description.includes("rain")) return "Don't forget your umbrella ☔ and watch out for slippery roads!";
    if (description.includes("clear")) return "Stay hydrated 💧 and wear sunscreen 😎 to avoid sunburn.";
    if (description.includes("cloud")) return "Looks gloomy outside—carry a light jacket 🧥 just in case!";
    if (description.includes("snow")) return "Bundle up! ❄️ Roads may be icy, so drive safe and stay warm.";
    if (description.includes("wind")) return "Secure loose items outside and avoid cycling during heavy winds 🌀.";
    if (description.includes("fog")) return "Drive slowly 🚗 and keep headlights on low beam.";
    return "Check the weather and stay safe today!";
}

submitButton.addEventListener("click",function(){
    console.log("Button clicked!");
    let city = searchInput.value; 
    console.log("City entered:", city);

    let apiKey = "b9361e9a67dd4be40044dd0bef9da1d3";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log("Final URL:", apiURL);
    fetch(apiURL)
        .then(response =>{
            if(!response.ok){
                throw new Error("City not found");
            }
            return response.json()
        })
        .then(data =>{
            console.log(data);
            let temp=data.main.temp;
            let cityname=data.name;
            let description=data.weather[0].description;
            cityNameEl.textContent=cityname;
            tempEl.textContent=`${temp} C`;
            commentEl.textContent=getQuote(description);
        })
        .catch(error => {
            console.log("Error fetching weather:",error);
            cityNameEl.textContent="Error!";
            tempEl.textContent="";
            commentEl.textContent="Couldnt fetch the weather.";
        })
        
})