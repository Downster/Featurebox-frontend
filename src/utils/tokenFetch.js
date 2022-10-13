import { getCookie } from 'cookies-next'

export async function tokenFetch(url, options = {}) {
    // set options.method to 'GET' if there is no method
    options.method = options.method || 'GET';
    // set options.headers to an empty object if there is no headers
    options.headers = options.headers || {};

    if (getCookie('XSRF-TOKEN')) {
        options.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN')
    }
    if (getCookie('Authorization')) {
        options.headers['Authorization'] = getCookie('Authorization')
    }
    // call the default window's fetch with the url and the options passed in
    console.log(options)
    const res = await fetch(url, options);

    return res;
}