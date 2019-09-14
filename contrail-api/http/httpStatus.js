// error statuses
exports.INVALID_REQUEST_BODY = {
    code: "invalidBody",
    message: "The request body is invalid."
}

exports.DOCUMENT_NOT_EXIST = {
    code: "documentNotExist",
    message: "The data document does not exist."
}

exports.PERMISSION_DENIED = {
    code: "permissionDenied",
    message: "User does not have permission to access this resource."
}

exports.FAVOURITE_SUCCESSFUL = (resourceCount) => {
    return {
        code: "favouriteSuccess",
        message: `Successfully favourited ${resourceCount} file(s).`,
    }
}

exports.UNFAVOURITE_SUCCESSFUL = (resourceCount) => {
    return {
        code: "unfavouriteSuccess",
        message: `Successfully unfavourited ${resourceCount} file(s).`,
    }
}

exports.TRASH_SUCCESSFUL = (resourceCount) => {
    return {
        code: "trashSuccess",
        message: `Successfully trashed ${resourceCount} file(s).`,
    }
}

exports.RESTORE_SUCCESSFUL = (resourceCount) => {
    return {
        code: "restoreSuccess",
        message: `Successfully restored ${resourceCount} file(s).`,
    }
}


exports.SHARE_SUCCESSFUL = (resourceCount, userCount) => {
    return {
        code: "shareSuccess",
        message: `Successfully shared ${resourceCount} file(s) to ${userCount} users.`,
    }
}

exports.UNSHARE_SUCCESSFUL = (resourceCount) => {
    return {
        code: "shareSuccess",
        message: `Successfully unshared ${resourceCount} file(s).`,
    }
}

// statuses
exports.createCustomStatus = (code, message) => {
    return {
     code,
     message,
    }
}
