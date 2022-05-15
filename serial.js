const { SerialPort } = require('serialport')
const port = new SerialPort({
  path: '/dev/ttyUSB1',
  baudRate: 9600,
  autoOpen: true,
})

port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }

  // Because there's no callback to write, write errors will be emitted on the port:
  // port.write('main screen turn on')
})

// The open event is always emitted
port.on('open', function() {
  // open logic
  console.log('Serial port is open')
})

module.exports =  port