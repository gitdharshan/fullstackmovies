import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Store active abort controllers
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setIsLoading(true);
    setError(null); // Reset error before making a new request

    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal, // Assign fresh abort signal
      });

      const data = await response.json();

      // Remove the abort controller after request completion
      activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
