"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMQTTMessages = exports.switchState = exports.handleInput = void 0;
const mqtt_1 = require("./mqtt");
const serial_1 = require("./serial");
const appEnums_1 = require("./appEnums");
const switches = ['null', 'veranta', 'parveke', 'ykaula', 'ulko', 'ykmh1', 'ykph', 'ykmh2'];
const switchesMQTT = { veranta: 1, parveke: 2, ykaula: 3, ulko: 4, ykmh1: 5, ykph: 6, ykmh2: 7 };
const handleInput = (input) => {
    const inputData = JSON.parse(input);
    if (inputData.message === appEnums_1.MessageTypes.reply) {
        publishSwitchState(inputData);
    }
};
exports.handleInput = handleInput;
const switchState = (switchID, state) => {
    const getState = {
        message: appEnums_1.MessageTypes.command,
        switchId: switchID,
        outputState: state
    };
    return JSON.stringify(getState);
};
exports.switchState = switchState;
const getPower = (switchState) => {
    if (switchState) {
        return 'ON';
    }
    else if (!switchState) {
        return 'OFF';
    }
};
const publishSwitchState = (serialData) => {
    var _a;
    const light = serialData.switchId;
    const topic = `stat/light/${switches[light]}/RESULT`;
    const POWER = (_a = getPower(serialData.outputState)) !== null && _a !== void 0 ? _a : '';
    serialData.POWER = POWER;
    const payload = JSON.stringify(serialData);
    mqtt_1.client.publish(topic, payload, { qos: 1, retain: false }, (error) => {
        if (error) {
            console.error(error);
        }
    });
};
const publishStat = (topic, payload) => {
    topic = topic.replace('cmnd', 'stat').replace('POWER', 'RESULT');
    const statPayload = `{"POWER":"${payload.toString()}"}`;
    mqtt_1.client.publish(topic, statPayload, { qos: 1, retain: false }, (error) => {
        if (error) {
            console.error(error);
        }
    });
};
const handleMQTTMessages = (topic, payload) => {
    console.log('before switch: ', topic.split('/')[0]);
    switch (topic.split('/')[0]) { // topic is 'stat/light/parveke/RESULT' or 'cmnd/light/veranta/POWER'
        case 'stat':
            console.log('in switch case: stat ');
            // payload {"message":"reply","switchId":7,"outputState":false,"POWER":"OFF"}
            break;
        case 'cmnd':
            // payload is 'ON' or 'OFF'
            // in this case we should write to serial the payload
            console.log('in switch case: cmnd');
            serial_1.port.write(gatherPayload(topic, payload));
            publishStat(topic, payload);
            break;
    }
};
exports.handleMQTTMessages = handleMQTTMessages;
const gatherPayload = (topic, payload) => {
    // topic.split('/')[2] is getting string from the 'cmnd/light/ykph/POWER' in this example its 'ykph'
    const switchID = switchesMQTT[topic.split('/')[2]];
    return createSerialCommand(switchID, payload);
};
const createSerialCommand = (switchID, payload) => {
    switch (payload.toString()) {
        case 'ON':
            return `{"message":"command","switchId":${switchID},"outputState":true,"POWER":${payload.toString()}`;
        case 'OFF':
            return `{"message":"command","switchId":${switchID},"outputState":true,"POWER":${payload.toString()}`;
    }
};
