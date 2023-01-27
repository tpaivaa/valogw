
enum MessageTypes {
  command = 'command',
  reply = 'reply'
}

enum OutputStates {
  on = 'true',
  off = 'false',
  query = 'query',
  toggle = 'toggle'
}

enum States {
  on = 'true',
  off = 'false',
  query = 'query',
  toggle = 'toggle'
}

enum Switches {
  veranta = 1,
  parveke = 2,
  ykaula = 3,
  ulko = 4,
  ykmh1 = 5,
  ykph = 6,
  ykmh2 = 7,
}

enum Lights {
  Veranta,
  Parveke,
  ykAula,
  Ulko,
  Ykmh1,
  Ykph,
  Ykmh2
}

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
  Switches,
  States,
  Lights
}