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
const apiKey = '5835f1f8c4b04f35ffbfed07545e1b08'
let inputCity = 'Montreal,CA'
let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}`
let weather

async function init() {
    const res = await fetch(url)
    weather = await res.json()
    updateDisplay()
    submit.addEventListener('click', ()=>fetchData())
}

async function fetchData () {
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

init()
