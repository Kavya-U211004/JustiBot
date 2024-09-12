// src/components/ProtectedComponent.js
import React, { useEffect, useState } from 'react';

const ProtectedComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProtectedData = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:5000/api/protected', {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                } else {
                    setError('Failed to fetch protected data');
                }
            } catch (err) {
                setError('Error occurred');
            }
        };

        fetchProtectedData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return <div>{data.message}</div>;
};

export default ProtectedComponent;
