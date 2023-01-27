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
const sub_topic = 'stat/light/#';
const pub_topic = 'cmnd/light/veranta/POWER';
mqtt_1.client.on('connect', () => {
    console.log('Connected');
    mqtt_1.client.subscribe([sub_topic], () => {
        console.log(`Subscribe to topic '${sub_topic}'`);
    });
    mqtt_1.client.publish(pub_topic, 'ON', { qos: 1, retain: false }, (error) => {
        if (error) {
            console.error(error);
        }
    });
});
mqtt_1.client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString());
});
