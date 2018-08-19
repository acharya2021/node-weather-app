// const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
    .options({
        a: {
            // address MUST be input
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            // given input MUST be a string
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

console.log(argv);

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    }
    else {
        //    pretty printing object
        // console.log(JSON.stringify(results, undefined, 2));

        console.log(results.address);

        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
                if (errorMessage) {
                    console.log(errorMessage);
                } else {
                    // console.log(JSON.stringify(weatherResults, undefined, 2));
                    console.log(`It's currently ${weatherResults.currentTemperature}. It feels like ${weatherResults.apparentTemperature}.`);
                }
            }
        );
    }
});



