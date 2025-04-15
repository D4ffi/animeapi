const errorHandler = require('./errorHandler');
const requestLogger = require('./requestLogger');
const cors = require('./corsMiddleware');
const jsonParser = require('./jsonParser');
const notFound = require('./notFound');

module.exports = {
    errorHandler,
    requestLogger,
    cors,
    jsonParser,
    notFound
};