// error statuses
exports.INVALID_REQUEST_BODY = {
    code: "invalidBody",
    message: "The request body is invalid."
}

// success statuses
exports.SHARE_SUCCESS = {
    code: "shareSuccess",
    message: "File(s) have been successfully shared."
}

exports.UNSHARE_SUCCESS = {
    code: "unshareSuccess",
    message: "File(s) have been successfully unshared."
}

exports.createCustomStatus = (code, message) => {
    return {
     code,
     message,
     }
 }