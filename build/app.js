"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serial_1 = require("./serial");
const helpers_1 = require("./helpers");
const mqtt_1 = require("./mqtt");
// Switches the port into "flowing mode"
serial_1.parser.on('data', function (data) {
    try {
        const input = JSON.parse(data);
        (0, helpers_1.handleInput)(input);
    }
    catch (e) {
        console.log('in Error');
        console.log(data.toString());
        // port.write(switchState(Switches.ykmh1,States.query))
    }
});
// Handle errors
mqtt_1.client.on("error", (error) => {
    console.log("Error occurred: " + error);
});
