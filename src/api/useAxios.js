import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (method, route, body = {}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios({
            method,
            url: `${process.env.REACT_APP_API_URL}${route}`,
            data: body,
        })
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
        // eslint-disable-next-line
    }, [route]);

    return { data, isLoading, error };
};

export default useAxios;

// TODO: if !res.ok throw error
// TODO: handle id not found error
// TODO: useEffect cleanup
