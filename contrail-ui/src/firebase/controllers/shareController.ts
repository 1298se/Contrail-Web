import axios from "axios";
import { IResourceModel } from "../../types/resource.types";

export const getCollaborators = (resources: IResourceModel[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        const resourceIds = resources.map((resource) => resource.generation);
        const request = {
            params: {
                ids: resourceIds,
            },
        };
        axios.get("/api/resources/collaborators", request)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data.message);
            });
    });
};
