const request = require("postman-request")

const getForecast = (lat, lon, callback) => {
    // const url = 'http://api.weatherstack.com/current?access_key=a86e73867f70d4dec0789cb2e085ca88&query=' + lat + ',' + lon
    const url = 'http://api.weatherstack.com/current?access_key=a86e73867f70d4dec0789cb2e085ca88&query='+lat+','+lon

    request({url, json: true}, (error, {body:response} = {}) => {
        if (error)
            callback('Unable to connect.')
        else if (response.error)
            callback('Unable to find forecast for this location.')
        else 
            callback(undefined, response.current.weather_descriptions[0] + ' today. It is currently ' + response.current.temperature + ' degrees out. It feels like ' + response.current.feelslike)
    })
}

module.exports = getForecast