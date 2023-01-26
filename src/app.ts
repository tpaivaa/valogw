import { port, parser } from './serial'
import { handleInput, switchState, Switches , States} from './helpers'


// Switches the port into "flowing mode"
port.on('data', function (data: string) {
  try {
    const input = JSON.parse(data)
    handleInput(input)
  } catch (e) {
    console.log('in Error')
    console.log(data.toString())
    // port.write(switchState(Switches.ykmh1,States.query))
  }
})