import { useState, useCallback, useRef, useEffect } from "react";

export function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState<string | null>(null);
  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(async function (
    url: string,
    method = "GET",
    body: BodyInit | null = null,
    headers: HeadersInit = {}
  ) {
    setIsLoading(true);
    setIsError(null);
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal,
      });

      const responseData = await response.json();

      activeHttpRequests.current = activeHttpRequests.current.filter(
        (reqCtrl) => reqCtrl !== httpAbortCtrl
      );

      if (!response.ok) {
        throw new Error(responseData.message || "Request failed");
      }

      //   setIsLoading(false);
      return responseData;
    } catch (err) {
      //   setIsLoading(false);
      if (err instanceof Error && err.name === "AbortError") {
        console.log("Request was cancelled");
        return;
      }

      if (err instanceof Error) {
        setIsError(err.message);
      } else {
        setIsError("Something went wrong");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  },
  []);

  function clearError() {
    setIsError(null);
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
}
