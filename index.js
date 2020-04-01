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
input.addEventListener('input', (event) => {
    fetchData(event.target.value);

});

// console.log();
