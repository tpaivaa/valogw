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

const sub_topic = 'stat/light/#'
const pub_topic = 'cmnd/light/veranta/POWER'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([sub_topic], () => {
    console.log(`Subscribe to topic '${sub_topic}'`)
  })
  client.publish(pub_topic, 'ON', { qos: 1, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})