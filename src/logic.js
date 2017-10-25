import request from 'request'


export const logic = ($message) => {
    return new Promise((resolve, reject) => {
        if ($message.luis.entities.lenght === 0 && !$message.luis.entities[0].type) {
            const newMessage = Object.assign($message.message, { content: 'Je n\'ai pas réussi à trouver votre ville' })
            resolve(Object.assign($message, { message: newMessage }))
        }

        var options = {
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + $message.luis.entities.entity + ',fr&appid=' + process.env.OPEN_WEATHER_API_KEY
        }

        request(options, function (error, response, body) {
            if (error) {
                const newMessage = Object.assign($message.message, { content: "J'ai eu un problème quand j'ai voulu récupéré les données ..." })
                resolve(Object.assign($message, { message: newMessage }))
            }

            let jsonData = JSON.parse(body)
            //Kelvin to celsuis
            let degrees = jsonData.main.temp - 273.15
            console.log('result' + jsonData)
            let meteo = 'Voici la météo pour ' + degrees

            const newMessage = Object.assign($message.message, { content: meteo })
            resolve(Object.assign($message, { message: newMessage }))
        })
    })

}   