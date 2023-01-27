"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchState = exports.handleInput = void 0;
const mqtt_1 = require("./mqtt");
const appEnums_1 = require("./appEnums");
const switches = ['null', 'veranta', 'parveke', 'ykaula', 'ulko', 'ykmh1', 'ykph', 'ykmh2'];
const handleInput = (input) => {
    const inputData = JSON.parse(input);
    if (inputData.message === appEnums_1.MessageTypes.reply) {
        publishSwitchState(inputData);
    }
    console.log(inputData.outputState);
    switch (inputData.outputState) {
        case true:
            console.log('Switch %d id %s', inputData.switchId, 'on');
            break;
        case false:
            console.log('Switch %d id %s', inputData.switchId, 'off');
            break;
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
