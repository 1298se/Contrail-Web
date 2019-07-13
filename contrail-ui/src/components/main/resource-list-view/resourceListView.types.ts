export interface IData {
    name: string;
    resourceId: string;
    owner: string;
    dateCreated: string;
    fileSize: number;
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
