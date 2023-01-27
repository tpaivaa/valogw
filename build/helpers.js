"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMQTTMessages = exports.switchState = exports.handleInput = void 0;
const mqtt_1 = require("./mqtt");
const serial_1 = require("./serial");
const appEnums_1 = require("./appEnums");
const switches = ['null', 'veranta', 'parveke', 'ykaula', 'ulko', 'ykmh1', 'ykph', 'ykmh2'];
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
const handleMQTTMessages = (topic, payload) => {
    switch (topic.split('/')[0]) { // topic is 'stat/light/parveke/RESULT' or 'cmnd/light/veranta/POWER'
        case 'stat':
            // payload {"message":"reply","switchId":7,"outputState":false,"POWER":"OFF"}
            break;
        case 'cmnd':
            // payload is 'ON' or 'OFF'
            // in this case we should write to serial the payload
            serial_1.port.write(payload.toString());
    }
};
exports.handleMQTTMessages = handleMQTTMessages;
