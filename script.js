const submit = document.querySelector('.submit')
// const temp = document.querySelector('.temp')
// const desc = document.querySelector('.desc')
// const location = document.querySelector('.location')
const searchBar = document.querySelector('.search')
const image = document.querySelector('.image')
const apiKey = '588188683e61bb5a644af1f600af33f9'
let inputCity = 'Toronto,CA'
let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}`
let data = null
let currentWeather

async function init() {
    const res = await fetch(url)
    currentWeather = await res.json()
    updateDisplay()
    submit.addEventListener('click', ()=>{
        inputCity=searchBar.value
        url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}`
        fetch(url)
            .then(res=>res.json())
            .then(data=>currentWeather=data)
            .then(()=>updateDisplay())
    })
}

function updateDisplay () {
    // temp.innerText=currentWeather.main.temp
    
    switch(currentWeather.weather[0].main) {
        case 'Clouds':
            image.src='https://i.imgur.com/zoclZid.png'
            break
        case 'Rain':
            image.src='https://i.imgur.com/GhyWeYB.jpeg'
            break
        default:
            image.src='https://i.imgur.com/oiYLRyZ.jpeg'
    }
}

init()
