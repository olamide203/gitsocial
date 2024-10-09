export class FetchError extends Error {
  info?: any;
  status?: number;

  constructor(message: string, status?: number, info?: any) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    this.info = info;

    Object.setPrototypeOf(this, FetchError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }
  }
}
export default async function fetcher(
  url: string,
  init: RequestInit = { method: "GET", credentials: "include" },
) {
  const res = await fetch(url, init);
  // if status code is 204, return
  if (res.status === 204) {
    return;
  }

  // If status code is not in the range 200-209, we still want to parse and throw it
  if (!res.ok) {
    // attach extra info to the error object
    const info = await res.json();
    throw new FetchError(
      "An error occured while fetching the data.",
      res.status,
      info,
    );
  }

  return res.json();
}
