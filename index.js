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

createAutoComplete({
    root: document.querySelector('.autocomplete')
});
createAutoComplete({
    root: document.querySelector('.autocomplete-two')
});
createAutoComplete({
    root: document.querySelector('.autocomplete-three')
});


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