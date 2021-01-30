import '../css/style.scss';

const cities = require('../cities.json');
const { createAutoComplete } = require('../../../auto-complete/index');

const autocomplete = createAutoComplete(cities);
const countCitiesOnPage = Math.ceil((window.innerHeight - 65) / 33) + 2;
let searchTerm = '';
let scrollLine = 0;
let endScrollLine = 0;
let outputCities;

document.body.innerHTML = `
    <header class="header">
        <h3>Instant Search</h3>
        <input type="text" class="search" placeholder="Search for a City">
    </header>
    <ul class="cities"></ul>`;

const searchInput = document.querySelector('.search');
const results = document.querySelector('.cities');

const showCities = () => {
    results.innerHTML = '';
    outputCities = searchTerm ? autocomplete(searchTerm) : cities;
    endScrollLine = outputCities.length;

    const loadMore = function () {
        for (let i = scrollLine; i < scrollLine + countCitiesOnPage; i++) {
            if (i >= endScrollLine) {
                scrollLine = endScrollLine;
                return;
            }

            const li = document.createElement('li');
            const cityName = document.createElement('div');

            cityName.innerText = outputCities[i];
            cityName.classList.add('city-item');

            li.appendChild(cityName);
            results.appendChild(li);
        }

        scrollLine += countCitiesOnPage;
    }

    window.addEventListener("scroll", function () {
        if (window.pageYOffset + window.innerHeight >= results.offsetHeight) {
            loadMore();
        }
    });

    loadMore();
}

showCities();

searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    scrollLine = 0;
    window.scrollTo(0, 0);
    showCities();
})
