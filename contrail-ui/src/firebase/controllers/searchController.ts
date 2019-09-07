import axios from "axios";
import { IUserModel } from "../../types/user.types";

export const searchUsers = (query: string): Promise<any> => {
    const searchUrl = `/search?where_query=${query}`;
    return new Promise((resolve, reject) => {
        axios.get("/api" + searchUrl)
            .then((response) => {
                const newOptions: IUserModel[] = [];
                response.data.map((user: firebase.User) => {
                    if (user.email && user.displayName) {
                        newOptions.push({
                            uid: user.uid,
                            displayName: user.displayName,
                            email: user.email,
                        });
                    }
                });
                resolve(newOptions);
            })
            .catch((error) => {
                reject(error.response.data.message);
            });
    });
};
