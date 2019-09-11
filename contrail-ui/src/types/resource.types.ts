import { IUserModel } from "./user.types";

export interface IUserResources {
    root: IResourceModel[];
    favourites: string[];
    sharedBy: string[];
    sharedTo: string[];
    trash: string[];
}

export interface IResourceModel {
    generation: string;
    name: string;
    owner: IUserModel;
    size: number;
    timeCreated: string;
}
