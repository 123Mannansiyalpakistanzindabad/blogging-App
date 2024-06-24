const {validateToken}  = require("../services/authentication")
function checkForAuthenticationCookie(cookieName) {
    const cookiefunc = (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]
        if (!tokenCookieValue) {
            return next()
        }
        try {
            const userPayload = validateToken(tokenCookieValue)
            req.user = userPayload
        } catch (error) { }
        return next()
    }
    return cookiefunc
}

module.exports = checkForAuthenticationCookie