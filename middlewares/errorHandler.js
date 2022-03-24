module.exports = (err, req, res, next) => {
    res.status(res.statusCode||400).send(err.message);
}