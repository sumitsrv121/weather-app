const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getGeoCode = require('./utils/geocode')
const getForeCast = require('./utils/forecast')
const request = require('request')

const app = express()
const pathForPublicDirectory = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pathForPublicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'sumit saurav'
    })
})

//weather
app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'Please provide address as a part of query string'
        })
    }
    getGeoCode(address, (error, { latitude, longitude, placeName } = {}) => {
        if (error) {
            return res.send({
                title: '404',
                name: 'Sumit Saurav',
                errorMessage: error
            })
        }
        getForeCast(latitude, longitude, (error, { weather_stat, temperature, rain } = {}) => {
            if (error) {
                return res.send({
                    title: '404',
                    name: 'Sumit Saurav',
                    errorMessage: error
                })
            }
            const message = 'Today the city of ' + placeName + ' will have ' + weather_stat + ' with current temperature of ' + temperature + 'degree celcius. There is ' + rain + '% chance of rain.'
            res.send({
                title: 'weather',
                message,
                name: 'Sumit Saurav'
            })
        })
    })
})

//about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sumit Saurav'
    })
})

//help
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a message for help',
        title: 'Help',
        name: 'Sumit Saurav'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Sumit Saurav',
        errorMessage: 'Help article not found'
    })
})

//404 page
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Sumit Saurav',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running')
})