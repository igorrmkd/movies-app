const fetchData = async (searchterm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: "c04285f4",
            s: searchterm
        }
    });
    console.log(response.data);

};

const input = document.querySelector('input');


const onInput = event => {
    fetchData(event.target.value);
};
input.addEventListener('input', debounce(onInput, 500)); // 500ms delay

