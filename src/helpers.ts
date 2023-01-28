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
const switchesMQTT: Record<string, number> = {veranta:1,parveke:2,ykaula:3,ulko:4,ykmh1:5,ykph:6,ykmh2:7}


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

const publishStat = (topic: string, payload: Buffer) => { // something like this stat/light/ykph/RESULT {"message":"reply","switchId":6,"outputState":false,"POWER":"OFF"}
  topic = topic.replace('cmnd','stat').replace('POWER','RESULT')
  const statPayload: string = `{"POWER":"${payload.toString()}"}`

  client.publish(topic, statPayload, { qos: 1, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
}

const handleMQTTMessages = (topic: string, payload: Buffer) => {

  switch (topic.split('/')[0]) { // topic is 'stat/light/parveke/RESULT' or 'cmnd/light/veranta/POWER'

    case 'stat':
      console.log('in switch case: stat ')
      // payload {"message":"reply","switchId":7,"outputState":false,"POWER":"OFF"}
      break
    case 'cmnd':
      // payload is 'ON' or 'OFF'
      // in this case we should write to serial the payload
      console.log('in switch case: cmnd' )
      port.write(gatherPayload(topic, payload))
      publishStat(topic, payload)
      break
  }
}

const gatherPayload = (topic: string, payload: Buffer) => {
  // topic.split('/')[2] is getting string from the 'cmnd/light/ykph/POWER' in this example its 'ykph'
  const switchID: number = switchesMQTT[topic.split('/')[2]]
  return createSerialCommand(switchID, payload)
}

const createSerialCommand = (switchID: number, payload: Buffer) => {
  switch (payload.toString()) {
    case 'ON':
      return `{"message":"command","switchId":${switchID},"outputState":true}`
    case 'OFF':
      return `{"message":"command","switchId":${switchID},"outputState":false}`
  }
}

export {
  handleInput,
  switchState,
  handleMQTTMessages,
}