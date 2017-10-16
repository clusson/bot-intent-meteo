import { connexion } from './rabbitConnexion'
import { assertQueue, sendTo } from './rabbitUtils'
const connexionEstablished = connexion()
let weather = require("Openweather-Node")
let fs = require('fs');
let city

//set your API key if you have one
weather.setAPPID(process.env.VERIFY_TOKEN)
//set the culture
weather.setCulture("fr")
//set the forecast type
weather.setForecastType("daily") //or "" for 3 hours forecast


weather.now(city, function (err, aData) {
  if (err) console.log(err)
  else {
    console.log(aData.getDegreeTemp())
  }
})

assertQueue(connexionEstablished, ($message) => {
  const newMessage = Object.assign($message.message, { content: repartie })
  const newIntentMessage = Object.assign($message, { message: newMessage })
  sendTo(connexionEstablished, JSON.stringify(newIntentMessage))
})



