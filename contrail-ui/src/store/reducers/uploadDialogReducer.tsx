const INITIAL_STATE = {
    dialogOpen: false,
};

function uploadDialogReducer(state = INITIAL_STATE, action: any): any {
    switch (action.type) {
        case "UPLOAD_DIALOG_OPEN": {
            return {
                ...state,
                dialogOpen: true,
           };
        }
        case "UPLOAD_DIALOG_CLOSE": {
            return {
                ...state,
                dialogOpen: false,
            };
        }
        default:
            return state;
    }
}

export default uploadDialogReducer;
