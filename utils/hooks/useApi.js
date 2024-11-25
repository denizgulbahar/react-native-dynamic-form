import { useState } from "react";

function useApi() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const callApi = async ({ url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' } }) => {
        setError(false); // Clean previous error
        setLoading(true);
        try {
            const options = {
                method,
                headers,
                ...(body !== null && { body: JSON.stringify(body) }),
            };

            // const response = await fetch(url, options);

            // Simulate API response
            const response = {
                ok: true, // Simulating a successful response
                status: 200,
                json: async () => ([
                    {
                        email: "meldaTastan@gmail.com",
                        id: "dd7430ef3f7b876dc8ea",
                        name: "melda",
                        others: { age: "27", weight: "45" }
                    },
                    
                ])
            };
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData;
        } catch (err) {
            setError(true)
            throw err; 
        } finally {
            setLoading(false);
        }
    };

    return { callApi, loading, error };
}

export default useApi;
