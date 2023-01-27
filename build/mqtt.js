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
module.exports = { client };
