const fetchData = async (searchterm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: "c04285f4",
            s: searchterm
        }
    });
    return response.data.Search;

};

const input = document.querySelector('input');


const onInput = async event => {
    const movies = await fetchData(event.target.value);
    console.log(movies);

};
input.addEventListener('input', debounce(onInput, 500)); // 500ms delay

