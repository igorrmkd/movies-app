const autocompleteConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}" />
            ${movie.Title}
            ${movie.Year}
        `;
    },

    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchTerm) {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: "c04285f4",
                s: searchTerm
            }
        });

        // if there is an response Error, i.e. the earched movie is not found.. return an empty array
        if (response.data.Error) {
            return [];
        }

        // return the data from Search
        return response.data.Search;

    }
};

createAutoComplete({
    ...autocompleteConfig, ///this means - make a copy of that object, and use it here..
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie) {
        /// after you click and select a movie.. hide the tutorial with a "bulma" class
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
    }
});
createAutoComplete({
    ...autocompleteConfig, ///this means - make a copy of that object, and use it here..
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie) {
        /// after you click and select a movie.. hide the tutorial with a "bulma" class
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
    }
});

let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: "c04285f4",
            i: movie.imdbID  // search/fetch by movie ID - https://omdbapi.com/
        }
    });

    // generate the html template/movieTemplate(response.data)/ -> and show them on the "id summary" in index.html
    summaryElement.innerHTML = movieTemplate(response.data);

    if (side === 'left') {
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }

    if (leftMovie && rightMovie) { // if both are defined.. compare them
        runComparison();
    }
};

const runComparison = () => {
    console.log("runComparison");

};

// a template for showing selected movie data, fetched from the API
const movieTemplate = (movieDetail) => {
    // it brings back a string "$629.444.258"
    // wee need to replace $ using regex(other course???) to empty string, and convert(parseInt) the rest of it to a plain number -
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));

    /// split the content by empty spaces, and save them as words or numbers in a array
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word); // convert all items to numbers, so that the words will become NaN
        if (isNaN(value)) { // if the parsed word is NaN, dont do anything
            return prev;
        } else {  // if the parsed word is a number, add it to count
            return prev + value;
        }
    }, 0);


    // console.log(awards);


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
    <article data-value=${awards} class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollars} class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metascore} class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
    `;
};