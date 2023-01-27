import {
  MessageTypes,
  OutputStates,
  Switches,
  States,
  Lights
} from './appEnums'

const handleInput = (input: string) => {
  const inputData = JSON.parse(input)
  console.log(inputData.outputState)
  switch (inputData.outputState) {
    case 'true':
      console.log('Switch %d id %s', inputData.switchId, 'on')
      break
    case 'false':
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



export {
  handleInput,
  switchState,
}