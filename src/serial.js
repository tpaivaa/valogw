import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'

const port = new SerialPort({
  path: '/dev/ttyUSB2',
  baudRate: 115200,
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


const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))

export {port , parser}