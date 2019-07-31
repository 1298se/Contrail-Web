import { IResourceModel } from "../../../types/resource.types";

export interface IData {
    name: string;
    owner: string;
    dateCreated: string;
    size: number;
}

export interface IResourceListProps {
    display: IResourceModel[];
}

export interface IHeadRow {
    id: keyof IData;
    label: string;
    numeric: boolean;
}

export interface IEnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    rowCount: number;
}
