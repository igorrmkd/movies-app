const fetchData = async () => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: "c04285f4",
            i: 'tt0848228'
        }
    });
    console.log(response.data);

};

fetchData();