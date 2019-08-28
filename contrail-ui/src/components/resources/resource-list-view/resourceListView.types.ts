import { IResourceModel, IUserResources } from "../../../types/resource.types";

export interface IData {
    name: string;
    owner: string;
    dateCreated: string;
    size: number;
}

export interface IHeadRow {
    id: keyof IData;
    label: string;
    numeric: boolean;
}

export interface IResourceListOwnProps {
    page: string;
}

export interface IResourceListStateProps {
    selectedResources: IResourceModel[];
    userResources: IUserResources;
}

export interface IResourceListDispatchProps {
    setSelected: (resources: IResourceModel[]) => void;
}

export type ResourceListProps =
IResourceListOwnProps &
IResourceListDispatchProps &
IResourceListStateProps;

export interface IEnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    rowCount: number;
}
