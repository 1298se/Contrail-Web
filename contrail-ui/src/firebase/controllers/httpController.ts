import axios from "axios";

export const setAuthorizedAxios = (token: string | null | undefined) => {
    if (token != null) {
        axios.defaults.headers.common.Authorization = `bearer ${token}`;
    }
};
