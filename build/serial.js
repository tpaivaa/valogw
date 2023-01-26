"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = exports.port = void 0;
const serialport_1 = require("serialport");
const parser_readline_1 = require("@serialport/parser-readline");
const port = new serialport_1.SerialPort({
    path: '/dev/ttyUSB2',
    baudRate: 115200,
    autoOpen: true,
});
exports.port = port;
port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message);
    }
    // Because there's no callback to write, write errors will be emitted on the port:
    // port.write('main screen turn on')
});
// The open event is always emitted
port.on('open', function () {
    // open logic
    console.log('Serial port is open');
});
const parser = port.pipe(new parser_readline_1.ReadlineParser({ delimiter: '\n' }));
exports.parser = parser;
