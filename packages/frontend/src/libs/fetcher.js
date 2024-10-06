export default async function fetcher(path, init) {
    const absolutePathRegex = /^(www\.)?(https?:\/\/).*/;
    const url = absolutePathRegex.test(path)
        ? path
        : `${import.meta.env.VITE_BACKEND_BASE_URL}${path}`;
    const res = await fetch(url, init);
    // if status code is 204, return
    if (res.status === 204) {
        return;
    }

    // If status code is not in the range 200-209, we still want to parse and throw it
    if (!res.ok) {
        const error = new Error("An error occured while fetching the data.");
        // attach extra info to the error object
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return await res.json();
}
