const { port,parser } = require('./serial')


// Switches the port into "flowing mode"
parser.on('data', function (data) {
  console.log('Data:', data.toString())
})