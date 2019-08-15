import { IResourceModel, IUserResources } from "../../types/resource.types";

export interface IResourceState {
    userResources: IUserResources;
    selectedResources: IResourceModel[];
}
