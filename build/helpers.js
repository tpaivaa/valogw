"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lights = exports.States = exports.Switches = exports.switchState = exports.handleInput = void 0;
var MessageTypes;
(function (MessageTypes) {
    MessageTypes["command"] = "command";
    MessageTypes["reply"] = "reply";
})(MessageTypes || (MessageTypes = {}));
var OutputStates;
(function (OutputStates) {
    OutputStates["on"] = "true";
    OutputStates["off"] = "false";
    OutputStates["query"] = "query";
    OutputStates["toggle"] = "toggle";
})(OutputStates || (OutputStates = {}));
var States;
(function (States) {
    States["on"] = "true";
    States["off"] = "false";
    States["query"] = "query";
    States["toggle"] = "toggle";
})(States || (States = {}));
exports.States = States;
var Switches;
(function (Switches) {
    Switches["veranta"] = "1";
    Switches["parveke"] = "2";
    Switches["ykaula"] = "3";
    Switches["ulko"] = "4";
    Switches["ykmh1"] = "5";
    Switches["ykph"] = "6";
    Switches["ykmh2"] = "7";
})(Switches || (Switches = {}));
exports.Switches = Switches;
var Lights;
(function (Lights) {
    Lights[Lights["Veranta"] = 0] = "Veranta";
    Lights[Lights["Parveke"] = 1] = "Parveke";
    Lights[Lights["ykAula"] = 2] = "ykAula";
    Lights[Lights["Ulko"] = 3] = "Ulko";
    Lights[Lights["Ykmh1"] = 4] = "Ykmh1";
    Lights[Lights["Ykph"] = 5] = "Ykph";
    Lights[Lights["Ykmh2"] = 6] = "Ykmh2";
})(Lights || (Lights = {}));
exports.Lights = Lights;
const handleInput = (input) => {
    const inputData = JSON.parse(input);
    console.log(inputData);
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
        message: MessageTypes.command,
        switchId: switchID,
        outputState: state
    };
    return JSON.stringify(getState);
};
exports.switchState = switchState;
