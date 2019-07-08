const INITIAL_STATE = {
    modalOpen: false,
};

function fileUploadReducer(state = INITIAL_STATE, action: any): any {
    switch (action.type) {
        case "FILE_UPLOAD_OPEN": {
            return {
                ...state,
                modalOpen: true,
           };
        }
        case "FILE_UPLOAD_CLOSE": {
            return {
                ...state,
                modalOpen: false,
            };
        }
        default:
            return state;
    }
}

export default fileUploadReducer;
