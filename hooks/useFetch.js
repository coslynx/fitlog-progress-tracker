import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom React hook for handling API data fetching with axios.
 * @param {() => Promise<T>} apiCall - A function that returns a Promise (e.g., an async function using axios).
 * @returns {{ data: T | null, loading: boolean, error: { message: string, status: number | null } | null }} An object containing the fetched data, loading state, and error object.
 * @template T
 */
const useFetch = (apiCall) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await apiCall();
                if(isMounted) {
                  setData(response);
                }

            } catch (err) {
                 if (isMounted) {
                   let errorResponse = { message: 'An error occurred', status: null };
                   if(axios.isAxiosError(err)){
                    errorResponse.message = err.response?.data?.message || err.message;
                    errorResponse.status = err.response?.status || null;
                   } else {
                    errorResponse.message = err.message || 'An error occurred';
                   }
                   setError(errorResponse);
                   console.error('API Error:', errorResponse);
                 }


            } finally {
                if(isMounted){
                    setLoading(false);
                }
            }
        };

        fetchData();

          return () => {
            isMounted = false;
            setLoading(false);
          };

    }, [apiCall]);

    return { data, loading, error };
};

export { useFetch };