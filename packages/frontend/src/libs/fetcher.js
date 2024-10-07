export default async function fetcher([url, token], init) {
  const absolutePathRegex = /^(www\.)?(https?:\/\/).*/;
  const absoluteURL = absolutePathRegex.test(url)
    ? url
    : `${import.meta.env.VITE_BACKEND_URL}${url}`;

  console.log(absoluteURL);
  const res = await fetch(absoluteURL, init);
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
