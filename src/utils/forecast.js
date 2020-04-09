const request = require('request')

const getWeatherReport = (latitude,longitude,callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid=0367f4a5a634d0da63c6b672ced31968&units=metric'
    request({url ,json : true}, (error,{body}) => {
        if(error){
            callback('unable to connect to the network')
        }else if(body.message){
            callback('unable to find the location. Please try another search')
        }else{
            callback(undefined,{
                temperature : body.main.temp,
                rain : body.clouds.all,
                weather_stat : body.weather[0].description
            })
        }
    })
}

module.exports = getWeatherReport