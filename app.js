const serialport = require('./serial')


// Switches the port into "flowing mode"
serialport.on('data', function (data) {
  console.log('Data:', data.toString())
})