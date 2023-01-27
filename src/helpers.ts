import { client } from './mqtt'

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

  console.log(inputData.outputState)
  switch (inputData.outputState) {
    case true:
      console.log('Switch %d id %s', inputData.switchId, 'on')
      break
    case false:
      console.log('Switch %d id %s', inputData.switchId, 'off')
      break
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

export {
  handleInput,
  switchState,
}