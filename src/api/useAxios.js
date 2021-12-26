import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logoutAction } from "../store/user/userAction";

const useAxios = (route) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const controller = new AbortController();

    const fetchData = () => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}${route}`,
            signal: controller.signal,
        })
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                if (err.message !== "canceled") {
                    if (err.response.status === 401) {
                        dispatch(logoutAction());
                        alert.show("Token expired. Please login again.");
                        return () => controller.abort();
                    }
                    setError(err);
                    setIsLoading(false);
                }
            });
    };

    useEffect(() => {
        fetchData();
        return () => controller.abort();
        // eslint-disable-next-line
    }, [route]);

    return { data, isLoading, error, fetchData };
};

export default useAxios;
