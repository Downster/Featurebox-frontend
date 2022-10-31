import { getCookie } from 'cookies-next'
import { useSession } from 'next-auth/react';

export async function tokenFetch(url, options = {}) {
    // set options.method to 'GET' if there is no method
    const { data: session } = useSession()
    options.method = options.method || 'GET';
    // set options.headers to an empty object if there is no headers
    options.headers = options.headers || {};

    if (session && "accessToken" in session) {
        options.headers['X-XSRF-TOKEN'] = session.accessToken
    }


    // call the default window's fetch with the url and the options passed in
    const res = await fetch(url, options);

    return res;
}