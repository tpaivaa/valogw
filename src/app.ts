import { port, parser } from './serial'
import { handleInput, switchState, handleMQTTMessages } from './helpers'
import { client } from './mqtt'



// Switches the port into "flowing mode"
parser.on('data', function (data: string) {
  try {
    console.log(require('util').inspect(data, { showHidden: true, depth: null }));
    const input = JSON.parse(data)
    console.dir(input)
    handleInput(data)
  } catch (e) {
    console.log('in Error')
    console.log(data.toString())
    // port.write(switchState(Switches.ykmh1,States.query))
  }
})

// Handle errors
client.on("error", (error) => {
  console.log("Error occurred: " + error);
});

// Handle MQTT messages
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
  handleMQTTMessages(topic, payload)

})