export default function determineEnv() {
    const enviornment = process.env.NODE_ENV;
    if (enviornment === "development") {
        backendURL = axios.create({
            baseURL: 'http://localhost:8080'
        })
    } else {
        backendURL = axios.create({
            baseURL: 'TBD'
        })
    }
    return backendURL
}