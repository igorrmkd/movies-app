const fetchData = async (searchterm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: "c04285f4",
            s: searchterm
        }
    });

    // if there is an response Error, i.e. the earched movie is not found.. return an empty array
    if (response.data.Error) {
        return [];
    }

    // return the data from Search
    return response.data.Search;

};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


const onInput = async event => {
    const movies = await fetchData(event.target.value);

    // after you delete the search term => if there is no movie fetched, remove the "is-active" class, and that will close the dropdown list.
    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    //clear the previous search results
    resultsWrapper.innerHTML = '';
    //  as soon as we fetched the movies, add this class to enable the dropdown
    dropdown.classList.add('is-active');
    // generate some html content on the page, -> the search results
    for (let movie of movies) {
        const option = document.createElement('a');
        // if the Poster image is N/A , set the source as empty string, otherwise.. use the actuall Poster image link as source
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;


        option.classList.add('dropdown-item');
        option.innerHTML = `
            <img src="${imgSrc}" />
            ${movie.Title}
        `;
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie);
        });

        resultsWrapper.appendChild(option);
    }

};
input.addEventListener('input', debounce(onInput, 500)); // 500ms delay

document.addEventListener('click', event => {
    // console.log(event.target); /// logs every click on the page
    if (!root.contains(event.target)) { /// if the click event is not inside the root (autocomplete widget), remove the "is-active" class, and that will close the dropdown list.
        dropdown.classList.remove('is-active');
    }
})

const onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: "c04285f4",
            i: movie.imdbID  // search/fetch by movie ID - https://omdbapi.com/
        }
    });

    // generate the html template/movieTemplate(response.data)/ -> and show them on the "id summary" in index.html
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);

};

// a template for showing selected movie data, fetched from the API
const movieTemplate = (movieDetail) => {
    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}" />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
    `;
};