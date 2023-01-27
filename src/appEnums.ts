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
enum Switch {
  veranta = 'veranta',
  parveke = 'parveke',
  ykaula = 'ykaula',
  ulko = 'ulko',
  ykmh1 = 'ykmh1',
  ykph = 'ykph',
  ykmh2 = 'ykmh2',
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



export {
  MessageTypes,
  OutputStates,
  Switches,
  States,
  Lights,
  Switch
}