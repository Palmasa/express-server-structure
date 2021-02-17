// Library requires
require('dotenv').config()
const express = require('express')
const createError = require('http-errors')
const logger = require('morgan')
const mongoose = require('mongoose')
const hbs = require('hbs')
const favicon = require('serve-favicon')

// Local requires
require('./config/db.config')
const routes = require('./config/routes')
    // const session = 
    // const Model = 

// Express config
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(logger('dev'))
app.use(favicon((__dirname + 'public' + 'favicon.ico')))
    // app.use(session)
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')

// Session 

// Routes
app.use('/', routes)

// Error handler
app.use((req, res, next) => {
    next(createError(404))
});

app.use((error, req, res, next) => {
    console.log(error)
    if (!error.status) {
        error = createError(500)
    }
    res.status(error.status)
    res.render('error', error)
});

// Initialization on port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))