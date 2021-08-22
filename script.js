const submit = document.querySelector('.submit')
const searchBar = document.querySelector('.search')
const apiKey = '588188683e61bb5a644af1f600af33f9'
let inputCity = 'Toronto,CA'
let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}`
let data = null
let currentWeather

async function init() {
    const res = await fetch(url)
    currentWeather = await res.json()
    console.log(currentWeather)
    submit.addEventListener('click', ()=>{
        inputCity=searchBar.value
        url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}`
        fetch(url)
            .then(res=>res.json())
            .then(data=>currentWeather=data)
            .then(d=>console.log(d))
    })
}

init()
