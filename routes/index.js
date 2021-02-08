const Router = require('express').Router();

Router.get('/', (req, res, next) => {
    res.send('<h1 style="text-align: center; margin-top: 20%; font-size: 72pt; font-family: Roboto, Arial">Powitanie</h1>');
    next()
});

module.exports = Router;