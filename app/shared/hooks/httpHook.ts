// import { useState, useCallback, useRef, useEffect } from "react";

// export function useHttpClient() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setIsError] = useState<string | null>(null);
//   const activeHttpRequests = useRef<AbortController[]>([]);

//   const sendRequest = useCallback(async function (
//     url: string,
//     method = "GET",
//     body: BodyInit | null = null,
//     headers: HeadersInit = {}
//   ) {
//     setIsLoading(true);
//     setIsError(null);
//     const httpAbortCtrl = new AbortController();
//     activeHttpRequests.current.push(httpAbortCtrl);

//     try {
//       const response = await fetch(url, {
//         method,
//         body,
//         headers,
//         signal: httpAbortCtrl.signal,
//       });

//       const responseData = await response.json();

//       activeHttpRequests.current = activeHttpRequests.current.filter(
//         (reqCtrl) => reqCtrl !== httpAbortCtrl
//       );

//       if (!response.ok) {
//         throw new Error(responseData.message || "Request failed");
//       }

//       //   setIsLoading(false);
//       return responseData;
//     } catch (err) {
//       //   setIsLoading(false);
//       if (err instanceof Error && err.name === "AbortError") {
//         console.log("Request was cancelled");
//         return;
//       }

//       if (err instanceof Error) {
//         setIsError(err.message);
//       } else {
//         setIsError("Something went wrong");
//       }
//       throw err;
//     } finally {
//       setIsLoading(false);
//     }
//   },
//   []);

//   function clearError() {
//     setIsError(null);
//   }

//   useEffect(() => {
//     return () => {
//       activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
//     };
//   }, []);

//   return { isLoading, error, sendRequest, clearError };
// }

import { useState, useCallback, useRef, useEffect } from "react";

interface HttpError extends Error {
  code?: string;
  isNetworkError?: boolean;
}

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

      return responseData;
    } catch (err) {
      // Handle AbortError (cancelled request)
      if (err instanceof Error && err.name === "AbortError") {
        console.log("Request was cancelled");
        return;
      }

      // Handle network errors (backend not running)
      if (err instanceof TypeError) {
        const networkErrorMessage =
          "Cannot connect to server. Please check if the backend is running on " +
          url.split("/api")[0];
        setIsError(networkErrorMessage);

        const networkError: HttpError = new Error(networkErrorMessage);
        networkError.isNetworkError = true;
        throw networkError;
      }

      // Handle other errors
      if (err instanceof Error) {
        setIsError(err.message);
        throw err;
      } else {
        const unknownError = "Something went wrong";
        setIsError(unknownError);
        throw new Error(unknownError);
      }
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
