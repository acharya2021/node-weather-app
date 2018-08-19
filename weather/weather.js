const request = require('request');

var getWeather = (latitude, longitude, callback) => {

    request({
        url: `https://api.darksky.net/forecast/70e364b6487c2f782523b545ef4b41aa/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        // console.log(JSON.stringify(body, undefined, 2));
        if (!error && response.statusCode === 200) {
            // console.log(body.currently.temperature);

            callback(undefined, {
                currentTemperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather');
        }
    });
};


module.exports.getWeather = getWeather;