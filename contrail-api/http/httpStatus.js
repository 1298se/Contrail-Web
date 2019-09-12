// error statuses
exports.INVALID_REQUEST_BODY = {
    code: "invalidBody",
    message: "The request body is invalid."
}

// statuses
exports.createCustomStatus = (code, message) => {
    return {
     code,
     message,
    }
}
