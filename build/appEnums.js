"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lights = exports.States = exports.Switches = exports.OutputStates = exports.MessageTypes = void 0;
var MessageTypes;
(function (MessageTypes) {
    MessageTypes["command"] = "command";
    MessageTypes["reply"] = "reply";
})(MessageTypes || (MessageTypes = {}));
exports.MessageTypes = MessageTypes;
var OutputStates;
(function (OutputStates) {
    OutputStates["on"] = "true";
    OutputStates["off"] = "false";
    OutputStates["query"] = "query";
    OutputStates["toggle"] = "toggle";
})(OutputStates || (OutputStates = {}));
exports.OutputStates = OutputStates;
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
    Switches[Switches["veranta"] = 1] = "veranta";
    Switches[Switches["parveke"] = 2] = "parveke";
    Switches[Switches["ykaula"] = 3] = "ykaula";
    Switches[Switches["ulko"] = 4] = "ulko";
    Switches[Switches["ykmh1"] = 5] = "ykmh1";
    Switches[Switches["ykph"] = 6] = "ykph";
    Switches[Switches["ykmh2"] = 7] = "ykmh2";
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
