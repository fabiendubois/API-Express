function errorHandler(err, req, res, next) {
    console.error(err);

    if (err.statusCode && err.message) {
        res.status(err.statusCode).send(err.message);
    } else {
        res.status(500).send();
    }
}

module.exports = errorHandler;