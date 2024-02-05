function addCsrfToken(req, res, next) {
    res.locals.csrfToken = req.csrfToken(); // the csrfToken() method is awailable thanks to the csrf middleware in app.js
    next();
}

module.exports = addCsrfToken;