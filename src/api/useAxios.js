import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (method, route, body = {}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const controller = new AbortController();

    useEffect(() => {
        axios({
            method,
            url: `${process.env.REACT_APP_API_URL}${route}`,
            data: body,
            signal: controller.signal,
        })
            .then((res) => {
                if (res.status !== 200) throw new Error("Unexpected error.");
                else {
                    setData(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (err.message !== "canceled") {
                    setError(err);
                    setIsLoading(false);
                }
            });
        return () => controller.abort();
        // eslint-disable-next-line
    }, [route]);

    return { data, isLoading, error };
};

export default useAxios;