import request from 'request'

export const logic = ($message) => {
    return new Promise((resolve, reject) => {

        if ($message.luis.entities.length === 0) {
            const newMessage = Object.assign($message.message, { content: 'Désolé ! Je n\'ai pas réussi à trouver votre ville' })
            resolve(Object.assign($message, { message: newMessage }))
            return
        }

        var options = {
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + $message.luis.entities[0].entity + ',fr&units=metric&appid=' + process.env.OPEN_WEATHER_API_KEY
        }

        request(options, function (error, response, body) {
            if (error) {
                const newMessage = Object.assign($message.message, { content: "Désolé ! J'ai eu un problème quand j'ai voulu récupérer les données ..." })
                resolve(Object.assign($message, { message: newMessage }))
            }

            let jsonData = JSON.parse(body)
            console.log(jsonData)
            let city = jsonData.name
            let degrees = jsonData.main.temp

            console.log('result' + jsonData)
            let meteo = 'Voici la météo pour ' + city + ' : ' + degrees + '°C'

            const newMessage = Object.assign($message.message, { content: meteo })
            resolve(Object.assign($message, { message: newMessage }))
        })
    })

}   