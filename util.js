const fetch = require('node-fetch')
const {
    InvalidRequest,
    InternalServerError,
    ResourceNotFound,
    Unauthorized
} = require('./customError')

// util method to send request to any url
module.exports.sendRequest = async (url, requestOptions, isJson = true) => {
    const response = await fetch(url, requestOptions)
    if (!response.ok) {
        const responseJson = await response.json()
        const respStatus = response.status
        handleError(responseJson, respStatus, url)
    }
    return isJson ? response.json() : response
}

const  handleError = (responseJson, respStatus, url) => {
    if (responseJson && responseJson.error) {
        const errorMsg = responseJson?.error || `Fetch Error while accessing ${url}`
        if (respStatus === 400) throw new InvalidRequest(errorMsg, 400)
        if (respStatus === 403) throw new InvalidRequest(errorMsg, 403)
        if (respStatus === 401) throw new Unauthorized(errorMsg, 401)
        if (respStatus === 404) throw new ResourceNotFound()
        throw new InternalServerError(errorMsg)
    }
}

