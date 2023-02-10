const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Denis Bilchenko'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Denis Bilchenko'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help me (lmao)',
        name: 'Denis Bilchenko 2'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must specify the address'
        })
    }

    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if (error)
            res.send({ error })
        else {
            forecast(lat, lon, (error, response) => {
                if (error)
                    return { error }
                else {
                    res.send({
                        location,
                        forecast: response, 
                        address: req.query.address
                    })
                }
            })
        }
    })

    // res.send({
    //     location: 'Belgorod',
    //     forecast: 'Sunny, 28 degrees out',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help page not found',
        name: 'Denis Bilchenko'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Denis Bilchenko'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})