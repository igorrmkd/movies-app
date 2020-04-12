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
        resultsWrapper.appendChild(option);
    }

};
input.addEventListener('input', debounce(onInput, 500)); // 500ms delay

