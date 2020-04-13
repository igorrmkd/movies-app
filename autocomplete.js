const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');


    const onInput = async event => {
        const items = await fetchData(event.target.value);

        // after you delete the search term => if there is no item fetched, remove the "is-active" class, and that will close the dropdown list.
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        //clear the previous search results
        resultsWrapper.innerHTML = '';
        //  as soon as we fetched the items, add this class to enable the dropdown
        dropdown.classList.add('is-active');
        // generate some html content on the page, -> the search results
        for (let item of items) {
            const option = document.createElement('a');

            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
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