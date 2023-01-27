"use strict";
const mqtt = require('mqtt');
require('dotenv').config({ path: '../.env', override: true });
const clientId = `mqtt_valogw${Math.random().toString(16).slice(3)}`;
const connectUrl = process.env.MQTT_BROKER_URL || '';
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS,
    reconnectPeriod: 1000,
});
const stat_topic = 'stat/light/#';
const cmnd_topic = 'cmnd/light/#';
client.on('connect', () => {
    console.log('MQTT Connected');
    client.subscribe([stat_topic], () => {
        console.log(`Subscribed to topic '${stat_topic}'`);
    });
    client.subscribe([cmnd_topic], () => {
        console.log(`Subscribed to topic '${cmnd_topic}'`);
    });
});
// Handle errors
client.on("error", function (error) {
    console.log("Error occurred: " + error);
});
// Notify reconnection
client.on("reconnect", function () {
    console.log("Reconnection starting");
});
// Notify offline status
client.on("offline", function () {
    console.log("Currently offline. Please check internet!");
});
module.exports = { client };
