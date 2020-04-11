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

const input = document.querySelector('input');


const onInput = async event => {
    const movies = await fetchData(event.target.value);

    // generate some html content on the page, -> the search results
    for (let movie of movies) {
        const div = document.createElement('div');

        div.innerHTML = `
            <img src="${movie.Poster}" />
            <h1>${movie.Title}</h1>
        `;
        document.querySelector('#target').appendChild(div);
    }

};
input.addEventListener('input', debounce(onInput, 500)); // 500ms delay

