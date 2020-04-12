const createAutoComplete = (config) => {
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

        // after you delete the search term => if there is no movie fetched, remove the "is-active" class, and that will close the dropdown list.
        if (!movies.length) {
            dropdown.classList.remove('is-active');
            return;
        }

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
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = movie.Title;
                onMovieSelect(movie);
            });

            resultsWrapper.appendChild(option);
        }

    };
    input.addEventListener('input', debounce(onInput, 500)); // 500ms delay

    document.addEventListener('click', event => {
        // console.log(event.target); /// logs every click on the page
        if (!root.contains(event.target)) { /// if the click event is not inside the root (autocomplete widget), remove the "is-active" class, and that will close the dropdown list.
            dropdown.classList.remove('is-active');
        }
    });
};