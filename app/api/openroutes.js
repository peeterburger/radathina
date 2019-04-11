'use strict'

var Client = require('node-rest-client').Client;
var client = new Client();

const schema = "https"
const host = "api.openrouteservice.org"
const url = `${schema}://${host}`

function build_directions_request(api_key, locomotion, start, end) {
    const profile = `${locomotion}?api_key=${api_key}&start=${start}&end=${end}`
    const api_req = `/v2/directions/${profile}`
    return `${url}${api_req}`
}

client.get(build_directions_request("5b3ce3597851110001cf624892e3aee660dd4e36a94e389509ba388c", "driving-car", "8.681495,49.41461", "8.687872,49.420318"), function (data, response) {
    // parsed response body as js object
    console.log(JSON.parse(data));
    // raw response
    // console.log(response);
});