import { IUserModel } from "./user.types";

export interface IUserResources {
    root: IUserResourceModel[];
    favourites: string[];
    sharedBy: string[];
    sharedTo: string[];
    trash: string[];
}

export interface IResourceModel {
    createdBy: string;
    id: string;
    name: string;
    path: string;
    permissions: Map<string, string>;
    size: number;
    timeCreated: string;
    updated: string;
}

export interface IUserResourceModel {
    generation: string;
    name: string;
    owner: IUserModel;
    size: number;
    timeCreated: string;
}
