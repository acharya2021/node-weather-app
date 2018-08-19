request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedADDR = encodeURIComponent(address);
        request({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedADDR,
            // take the json string and convert it into an object
            json: true
        }, (error, response, body) => {
            // console.log(body);
            // console.log(JSON.stringify(body, undefined, 2));

            if (error) {
                reject("Unable to connect to google servers");
                // console.log("Unable to connect to google servers");
            } else if (body.status === 'ZERO_RESULTS') {
                reject("Unable to find that address");
                // console.log("Unable to find that address");
            }
            else if (body.status === "OK") {
                // because error undefined
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
                // console.log(`Location: ${body.results[0].formatted_address}`);
                // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
                // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
            }
        });
    });

};


geocodeAddress('kathmandu').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));

}, (errorMessage) => {
    console.log(errorMessage);
});