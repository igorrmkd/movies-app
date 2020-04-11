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
