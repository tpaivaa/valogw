"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchState = exports.handleInput = void 0;
const appEnums_1 = require("./appEnums");
const handleInput = (input) => {
    const inputData = JSON.parse(input);
    console.log(inputData.outputState);
    switch (inputData.outputState) {
        case 'true':
            console.log('Switch %d id %s', inputData.switchId, 'on');
            break;
        case 'false':
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
