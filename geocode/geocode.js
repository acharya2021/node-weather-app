const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedADDR = encodeURIComponent(address);
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedADDR,
        // take the json string and convert it into an object
        json: true
    }, (error, response, body) => {
        // console.log(body);
        // console.log(JSON.stringify(body, undefined, 2));

        if (error) {
            callback("Unable to connect to google servers");
            // console.log("Unable to connect to google servers");
        } else if (body.status === 'ZERO_RESULTS') {
            callback("Unable to find that address");
            // console.log("Unable to find that address");
        }
        else if (body.status === "OK") {
            // because error undefined
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
            // console.log(`Location: ${body.results[0].formatted_address}`);
            // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        }
    });

};

// to go to the url from the console by making http calls and fetch the required data
// this is an object. Anything we put on this object will be available to any file that imports it
module.exports.geocodeAddress = geocodeAddress;
