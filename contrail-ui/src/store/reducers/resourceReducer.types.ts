import { IUserResourceModel, IUserResources } from "../../types/resource.types";

export interface IResourceState {
    userResources: IUserResources;
    selectedResources: IUserResourceModel[];
}
