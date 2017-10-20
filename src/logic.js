import request from 'request'


export const logic = ($message) => {
    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + $message + ',fr&appid=' + process.env.OPEN_WEATHER_API_KEY
        }

        request(options, function (error, response, body) {
            if (error) throw new Error(error)
            let jsonData = JSON.parse(body)
            let reponse = jsonData[0].main.temp
            const newMessage = Object.assign($message.message, { content: response })
            const newIntentMessage = Object.assign($message, { message: newMessage })
            resolve(newIntentMessage)
        })
    })

}   