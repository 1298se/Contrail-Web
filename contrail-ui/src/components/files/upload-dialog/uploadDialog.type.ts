export interface IFilesProgress {
    [key: string]: number;
}

export interface IFilesState {
    files: any;
    filesProgess: IFilesProgress;
}

export const dict: IFilesProgress = {};