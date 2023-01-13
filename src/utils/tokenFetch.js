import { getCookie } from 'cookies-next'
import { useSession } from 'next-auth/react';

export async function tokenFetch(url, options = {}) {
    const { data: session } = useSession()
    console.log(session)
    // set options.method to 'GET' if there is no method
    options.method = options.method || 'GET';
    // set options.headers to an empty object if there is no headers
    options.headers = options.headers || {};

    // TODO get token from session
    if (session.accessToken) {
        options.headers['Authorization'] = session.accessToken
    }
    // call the default window's fetch with the url and the options passed in
    const res = await fetch(url, options);

    return res;
}