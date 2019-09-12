import axios from "axios";
import { IResourceModel } from "../../types/resource.types";
import { IUnshareModel } from "../../types/shares.types";
import { IUserModel } from "../../types/user.types";

export const getCollaborators = (resources: IResourceModel[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        const ids = resources.map((resource) => resource.generation);
        const request = {
            params: {
                ids,
            },
        };
        axios.get("/api/shares", request)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data);
            });
    });
};

export const shareResources = (resources: IResourceModel[], users: IUserModel[]): Promise<any> => {
    const collaborators = users.map((user) => user.uid);
    return new Promise((resolve, reject) => {
        axios.put("/api/resources", {
            type: "share",
            resources,
            collaborators,
        })
            .then((response) => {
                resolve(response.data.message);
            })
            .catch((error) => {
                reject(error.response.data);
            });
    });
};

export const unshareResources = (shares: IUnshareModel[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.put("/api/resources", {
            type: "unshare",
            shares,
        })
            .then((response) => {
                resolve(response.data.message);
            })
            .catch((error) => {
                reject(error.response.data);
            });
    });
};
