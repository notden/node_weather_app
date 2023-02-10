const request = require('postman-request')

const geocode = (address, callback) => {
    const urlGeocoding = 'https://api.openweathermap.org/geo/1.0/direct?q=' + encodeURIComponent(address) + '&limit=5&appid=36ae0d7ee1b0181c6f3e8704496a9fe7'

    request({url: urlGeocoding, json: true}, (error, {body: response} = {}) => {
        if (error)
            callback('Unable to connect.')
        else if (!response.length)
            callback('Unable to find location.')
        else {
            callback(undefined, {
                lat: response[0].lat,
                lon: response[0].lon,
                location: response[0].name
            })
        }
    })
}

module.exports = geocode