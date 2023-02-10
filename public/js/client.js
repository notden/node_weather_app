// const geocode = require('../../src/utils/geocode')
// const forecast = require('../../src/utils/forecast')

const fetchForecast = (address, callback) => {
    fetch('http://127.0.0.1:3000/weather?address='+address).then((response) => {
        response.json().then((data) => {
            // console.log(data)
            let messageOne_copy
            let messageTwo_copy

            if (data.error) {
                messageOne_copy = 'Oops..'
                messageTwo_copy = data.error
            } else {
                messageOne_copy = data.location
                messageTwo_copy = data.forecast
            }
            messageOne.textContent = 'asds'
            callback(messageOne_copy, messageTwo_copy)
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetchForecast(location, (messageOne_copy, messageTwo_copy) => {
        messageOne.textContent = messageOne_copy
        messageTwo.textContent = messageTwo_copy
    })
})