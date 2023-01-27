import { port, parser } from './serial'
import { handleInput, switchState } from './helpers'
import { client } from './mqtt'



// Switches the port into "flowing mode"
parser.on('data', function (data: string) {
  try {
    const input = JSON.parse(data)
    handleInput(input)
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