import { IUserModel } from "./user.types";

export interface IUserResources {
    favourites: IResourceModel[];
    root: IResourceModel[];
    sharedBy: IResourceModel[];
    sharedTo: IResourceModel[];
    trash: IResourceModel[];
}

export interface IResourceModel {
    generation: string;
    name: string;
    owner: IUserModel;
    size: number;
    timeCreated: string;
}
