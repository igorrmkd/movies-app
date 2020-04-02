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

const debounce = (func, delay = 1000) => {  // func-> the function that needs delay(was 1000ms)
    let timeoutId;
    return (...args) => { // the guard against running before the delay
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

const onInput = event => {
    fetchData(event.target.value);
};
input.addEventListener('input', debounce(onInput, 500)); // 500ms delay

