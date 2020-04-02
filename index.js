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

let timeoutId; // timeoutId from setTimeout
const onInput = event => {
    if (timeoutId) {  // if there is a timeoutId..
        clearTimeout(timeoutId);  // clear it, so the fetching wont happen as long as you are getting new input in oninput
    }
    setTimeout(() => { // generate a timeoutId, and fetch with a delay
        fetchData(event.target.value); //fetch
    }, 1000); //delay
};
input.addEventListener('input', onInput);
