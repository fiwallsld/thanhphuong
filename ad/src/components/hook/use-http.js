import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method || "GET",
        headers: requestConfig.headers || {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        console.log("response:", response.status);

        throw new Error({ mes: response.status });
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong!");
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
