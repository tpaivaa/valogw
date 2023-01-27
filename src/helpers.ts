import { client } from './mqtt'
import { port, parser } from './serial'
import {
  MessageTypes,
  OutputStates,
  Switches,
  States,
  Lights,
  Switch
} from './appEnums'

interface SerialData {
  message: string;
  switchId: number;
  outputState: boolean;
  POWER: string;
}

type State = {
  message: string,
  switchId: number,
  outputState: boolean,
  POWER: string
}


const switches = ['null','veranta','parveke','ykaula','ulko','ykmh1','ykph','ykmh2']


const handleInput = (input: string) => {
  const inputData: SerialData = JSON.parse(input)
  if (inputData.message === MessageTypes.reply) {
    publishSwitchState(inputData)
  }
}

const switchState = (switchID: number, state: string) => {
  const getState = {
    message: MessageTypes.command,
    switchId: switchID,
    outputState: state
  }
  return JSON.stringify(getState)
}

const getPower = (switchState: State["outputState"]) => {
  if(switchState) {
    return 'ON'
  } else if(!switchState) {
    return 'OFF'
  }
}

const publishSwitchState = (serialData : SerialData) => {
  const light = serialData.switchId
  const topic = `stat/light/${switches[light]}/RESULT`
  const POWER: string = getPower(serialData.outputState) ?? ''
  serialData.POWER = POWER
  const payload = JSON.stringify(serialData)
  client.publish(topic, payload, { qos: 1, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
}

const handleMQTTMessages = (topic: string, payload: Buffer) => {
  switch (topic.split('/')[0]) { // topic is 'stat/light/parveke/RESULT' or 'cmnd/light/veranta/POWER'
    case 'stat':
      // payload {"message":"reply","switchId":7,"outputState":false,"POWER":"OFF"}
      break
    case 'cmnd':
      // payload is 'ON' or 'OFF'
      // in this case we should write to serial the payload
      port.write(payload.toString())
  }
}


export {
  handleInput,
  switchState,
  handleMQTTMessages,
}