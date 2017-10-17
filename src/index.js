import { connexion } from './rabbitConnexion'
import { assertQueue, sendTo } from './rabbitUtils'
const connexionEstablished = connexion()
let weather = require("Openweather-Node")
let fs = require('fs')
let city
let weatherMessage

//set your API key if you have one
weather.setAPPID(process.env.PAGE_ACCESS_TOKEN)
//set the culture
weather.setCulture("fr")
//set the forecast type
weather.setForecastType("daily") //or "" for 3 hours forecast

assertQueue(connexionEstablished, ($message) => {

  console.log($message)

  weather.now($message.luis.entity, function (err, aData) {
    if (err) console.log(err)
    else {
      console.log(aData.getDegreeTemp())
      weatherMessage = aData.getDegreeTemp()
    }
  })
  const newMessage = Object.assign($message.message, { content: weatherMessage })
  const newIntentMessage = Object.assign($message, { message: newMessage })
  sendTo(connexionEstablished, JSON.stringify(newIntentMessage))
})
