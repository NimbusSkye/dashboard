const submit = document.querySelector('.submit')
const temp = document.querySelector('.temp')
const desc = document.querySelector('.desc')
const city = document.querySelector('.city')
const searchBar = document.querySelector('.search')
const feelsLike = document.querySelector('.feelslike')
const highlow = document.querySelector('.highlow')
const image = document.querySelector('.image')
const err = document.querySelector('.error')
const humidity = document.querySelector('.humidity')
const multiday = document.querySelector('.multiday')
let date = new Date()

const apiKey = '00c83340ffa1a0e895108c4471ab4db5'
let inputCity = 'Montreal,CA'
let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}`
let weather
let multidayW

async function init() {
    const res = await fetch(url)
    weather = await res.json()
    updateDisplay()
    submit.addEventListener('click', ()=>fetchCurrent())
}

async function fetchMultiDay () {
    date = new Date()
    multiday.textContent = ''
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&appid=${apiKey}`
    const res = await fetch(url)
    multidayW = await res.json()

    multidayW.daily.forEach(e=>{
        let day = document.createElement('div')
        day.classList.add('daily')
        day.innerHTML = `<h5>${date.toString().slice(0,10)}</h5> <br> <i class='wi wi-${translate(e.weather[0].main)}'></i> <br> ${e.weather[0].main} <br> High ${Math.round(e.temp.max)}°C <br> Low ${Math.round(e.temp.min)}°C <br> ${e.humidity}% Humidity <br> ${e.pop*100}% precipitation`
        multiday.appendChild(day)
        date = addDays(date, 1)
    })
}

async function fetchCurrent () {
    inputCity=searchBar.value
    url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}`
    const res = await fetch(url)
    weather = await res.json()
    updateDisplay()
}

function updateDisplay () {
    if(weather.cod==404 || inputCity==='') {
        err.innerText = 'Error: Invalid City Name'
        return
    }
    err.innerText=''
    image.src=''
    image.alt='Loading Image...'
    temp.innerText = `${KtoC(weather.main.temp)}°C`
    feelsLike.innerText = `Feels like ${KtoC(weather.main.feels_like)}°C`
    highlow.innerText = `Current range: ${KtoC(weather.main.temp_min)}°C - ${KtoC(weather.main.temp_max)}°C`
    city.innerText = `${weather.name}, ${weather.sys.country}`
    desc.innerText = weather.weather[0].main
    humidity.innerText = `${weather.main.humidity}% humidity`
    fetchMultiDay()
    
    switch(weather.weather[0].main) {
        case 'Clouds':
            image.src='https://i.imgur.com/zoclZid.png'
            document.body.style.backgroundColor = '#123059'
            document.body.style.color = 'white'
            break
        case 'Rain':
            image.src='https://i.imgur.com/GhyWeYB.jpeg'
            image.src = 'https://i.imgur.com/oiYLRyZ.jpeg'
            document.body.style.backgroundColor = 'grey'
            document.body.style.color = 'white'
            break
        case 'Clear':
            image.src = 'https://i.imgur.com/fVaPiDO.jpg'
            document.body.style.backgroundColor = '#f2ab75'
            document.body.style.color = 'black'
            break
        default:
            image.src='https://i.imgur.com/GhyWeYB.jpeg'
            document.body.style.backgroundColor = 'grey'
    }
}

function KtoC (kelvin) {
    return Math.round(kelvin-273.15)
}

function translate (description) {
    switch (description) {
        case 'Clouds':
            return 'cloud'
        case 'Clear':
            return 'day-sunny'
        default:
            return description.toLowerCase()
    }
}

function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}

init()
