import { IResourceModel } from "./resource.types";

export interface IUnshareModel {
  resource: IResourceModel;
  userIds: string[];
}
