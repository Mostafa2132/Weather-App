"use strict";
//? for frist sec
let todayName = document.querySelector("#todayName");
let todayData = document.querySelector("#todayData");
let todayMonth = document.querySelector("#Month");
let cityName = document.querySelector("#cityName");
let tmp = document.querySelector("#tmp");
let day1Img = document.querySelector("#img_day1");
let tmpInfo = document.querySelector("#tmpInfo");
let ummbData = document.querySelector("#ummbData");
let windSpeed = document.querySelector("#windSpeed");
let winddir = document.querySelector("#winddir");

//?Data for secand day
let day2 = document.querySelector(".day2");
let tmp2 = document.querySelector(".tmp2");
let tmpInfo2 = document.querySelector(".tmpInfo2");
let lowTmp1 = document.querySelector(".lowTmp1");
let day2_img = document.querySelector(".day2_img");

//?Data for thired day
let day3 = document.querySelector(".day3");
let tmp3 = document.querySelector(".tmp3");
let tmpInfo3 = document.querySelector(".tmpInfo3");
let lowTmp2 = document.querySelector(".lowTmp2");
let day3_img = document.querySelector(".day3_img");

//? search input
let search = document.querySelector("#search");

//? Data for date

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const d = new Date();
let month = months[d.getMonth()];
let day = d.getDate();
let dayname = days[d.getDay()];
todayMonth.innerHTML = day + " " + month;
todayName.innerHTML = dayname;
day2.innerHTML = days[d.getDay() + 1];
day3.innerHTML = days[d.getDay() + 2];

async function wheater(city) {
  try {
    let wheater = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=10b72dc3b779414ab7f24143242409&q=${city}&days=3`
    );
    let data = await wheater.json();
    return data;
  } catch {}
}

async function displayDay1(data) {
  cityName.innerHTML = data.location.name;
  tmp.innerHTML = data.current.temp_c + ` °C`;
  day1Img.src = data.current.condition.icon;
  tmpInfo.innerHTML = data.current.condition.text;
  ummbData.innerHTML = data.current.humidity + ` %`;
  windSpeed.innerHTML = data.current.wind_kph + ` km/h`;
  winddir.innerHTML = data.current.wind_dir;
}

async function displayDay2(data) {
  day2_img.src = data.forecast.forecastday[1].day.condition.icon;
  tmpInfo2.innerHTML = data.forecast.forecastday[1].day.condition.text;
  tmp2.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + ` °C`;
  lowTmp1.innerHTML =
    data.forecast.forecastday[1].day.mintemp_c + ` <sup>o</sup> `;
}
async function displayDay3(data) {
  day3_img.src = data.forecast.forecastday[2].day.condition.icon;
  tmpInfo3.innerHTML = data.forecast.forecastday[2].day.condition.text;
  tmp3.innerHTML = data.forecast.forecastday[2].day.maxtemp_c + ` °C`;
  lowTmp2.innerHTML =
    data.forecast.forecastday[2].day.mintemp_c + ` <sup>o</sup> `;
}

search.addEventListener("input", () => {
  displayAll(search.value);
});

async function displayAll(city = "cairo") {
  let wheaterData = await wheater(city);
  if(!wheaterData.error){
    displayDay1(wheaterData);
    displayDay2(wheaterData);
    displayDay3(wheaterData);
  }
  
}

displayAll();

// http://api.weatherapi.com/v1/search.json?key=<YOUR_API_KEY>&q=lond
