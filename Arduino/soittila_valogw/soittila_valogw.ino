/*
 Debounce

 Each time the input pin goes from LOW to HIGH (e.g. because of a push-button
 press), the output pin is toggled from LOW to HIGH or HIGH to LOW.  There's
 a minimum delay between toggles to debounce the circuit (i.e. to ignore
 noise).

 The circuit:
 * LED attached from pin 13 to ground
 * pushbutton attached from pin 2 to +5V
 * 10K resistor attached from pin 2 to ground
 */

// constants won't change. They're used here to
// set pin numbers:
const int verantaSwitch1 = 2;   // Verannan kytkin 1 input
const int verantaSwitch2 = 3;   // Verannan kytkin 2 input
const int verantaSwitch3 = 4;   // Verannan kytkin 3 input
const int verantaSwitch4 = 5;   // Verannan kytkin 4 input
const int ykmhSwitch1 = 6;      // Ylakerran kytkin 1 input
const int ykmhSwitch3 = 7;      // Ylakerran kytkin 3 input
const int ykMHLight = 8;        // Ylakerran Makuuhuone valo out ja kytkimen led output
const int ykPHLight = 9;        // Ylakerran Pesuhuone valo out ja kytkimen led output
const int verantaLight = 10;    // Verannan valo ja kytkimen1 led output
const int out2 = 11;            //  valo ja kytkimen2 led output
const int out3 = 12;            //  valo ja kytkimen3 led output
const int ulkoLight = 13;       // Ulkovalo ja kytkimen4 led output

String rstate = "";          // a string to hold returned state on function returnstate()
String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete
String endMarker = ";"

// Variables will change:
int verantaLightState = HIGH; // the current state of the veranta light
int switch1State;             // the current reading from the verantaLight
int lastSwitch1State = LOW;   // the previous reading from the Switch1

int light2State = HIGH;    // the current state of the output pin
int switch2State;             // the current reading from the input pin
int lastSwitch2State = LOW;   // the previous reading from the input pin

int light3State = HIGH;    // the current state of the output pin
int switch3State;             // the current reading from the input pin
int lastSwitch3State = LOW;   // the previous reading from the input pin

int ulkoLightState = HIGH;    // the current state of the output pin
int switch4State;             // the current reading from the input pin
int lastSwitch4State = LOW;   // the previous reading from the input pin

int ykmhLightState = HIGH;        // the current state of the output pin
int ykmhswitch1State;             // the current reading from the input pin
int lastykmhswitch1State = LOW;    // the previous reading from the input pin

int ykphLightState = HIGH;        // the current state of the output pin
int ykmhswitch3State;             // the current reading from the input pin
int lastykmhswitch3State = LOW;    // the previous reading from the input pin

// the following variables are long's because the time, measured in miliseconds,
// will quickly become a bigger number than can be stored in an int.
long lastDebounceTime1 = 0;  // the last time the output pin was toggled
long lastDebounceTime2 = 0;
long lastDebounceTime3 = 0;
long lastDebounceTime4 = 0;
long lastDebounceTime5 = 0;
long lastDebounceTime6 = 0;
long debounceDelay = 100;    // the debounce time; increase if the output flickers


void setup() {
  // initialize serial:
  Serial.begin(115200);
  Serial.println("Serial Init");
  // Flush switch states to serial connection
  Serial.print("sw1:");
  Serial.println(verantaLightState, DEC);
  Serial.print("sw2:");
  Serial.println(light2State, DEC);
  Serial.print("sw3:");
  Serial.println(light3State, DEC);
  Serial.print("sw4:");
  Serial.println(ulkoLightState, DEC);
  Serial.print("sw5:");
  Serial.println(ykmhLightState, DEC);
  Serial.print("sw6:");
  Serial.println(ykphLightState, DEC);
  
  inputString.reserve(200);
  // initialize pin inputs and outputs
  pinMode(verantaSwitch1, INPUT);
  pinMode(verantaSwitch2, INPUT);
  pinMode(verantaSwitch3, INPUT);
  pinMode(verantaSwitch4, INPUT);
  pinMode(ykmhSwitch1, INPUT);
  pinMode(ykmhSwitch3, INPUT);
  
  pinMode(verantaLight, OUTPUT);
  pinMode(out2, OUTPUT);
  pinMode(out3, OUTPUT);
  pinMode(ulkoLight, OUTPUT);
  pinMode(ykMHLight, OUTPUT);
  pinMode(ykPHLight, OUTPUT);


  // set initial Lights state
  digitalWrite(verantaLight, verantaLightState);
  digitalWrite(out2, light2State);
  digitalWrite(out3, light3State);
  digitalWrite(ulkoLight, ulkoLightState);
  digitalWrite(ykMHLight, ykmhLightState);
  digitalWrite(ykPHLight, ykphLightState);
}

void loop() {

  // read the state of the switch into a local variable:
  int sw1reading = digitalRead(verantaSwitch1);
  int sw2reading = digitalRead(verantaSwitch2);
  int sw3reading = digitalRead(verantaSwitch3);
  int sw4reading = digitalRead(verantaSwitch4);
  int sw5reading = digitalRead(ykmhSwitch1);
  int sw6reading = digitalRead(ykmhSwitch3);


  // check to see if the button is just pressed 
  // (i.e. the input went from LOW to HIGH),  and you've waited
  // long enough since the last press to ignore any noise:

  // If the switch changed, due to noise or pressing:
  if (sw1reading != lastSwitch1State) {
    // reset the debouncing timer
    lastDebounceTime1 = millis();
  }
    // If the switch changed, due to noise or pressing:
  if (sw2reading != lastSwitch2State) {
    // reset the debouncing timer
    lastDebounceTime2 = millis();
  }
    // If the switch changed, due to noise or pressing:
  if (sw3reading != lastSwitch3State) {
    // reset the debouncing timer
    lastDebounceTime3 = millis();
  }
    if (sw4reading != lastSwitch4State) {
    // reset the debouncing timer
    lastDebounceTime4 = millis();
  }
    if (sw5reading != lastykmhswitch1State) {
    // reset the debouncing timer
    lastDebounceTime5 = millis();
  }
    if (sw6reading != lastykmhswitch3State) {
    // reset the debouncing timer
    lastDebounceTime6 = millis();
  }
  

  if ((millis() - lastDebounceTime1) > debounceDelay) {
    // whatever the reading is at, it's been there for longer
    // than the debounce delay, so take it as the actual current state:

    // if the button state has changed:
    if (sw1reading != switch1State) {
      switch1State = sw1reading;

      // only toggle the out if the new button state is HIGH
      if (switch1State == HIGH) {
        verantaLightState = !verantaLightState;
        returnstate(1, verantaLightState);
      }
    }
  }

    if ((millis() - lastDebounceTime2) > debounceDelay) {
    // whatever the reading is at, it's been there for longer
    // than the debounce delay, so take it as the actual current state:

    // if the button state has changed:
    if (sw2reading != switch2State) {
      switch2State = sw2reading;

      // only toggle the out if the new button state is HIGH
      if (switch2State == HIGH) {
        light2State = !light2State;
        returnstate(2, light2State);
      }
    }
  }

    if ((millis() - lastDebounceTime3) > debounceDelay) {
    // whatever the reading is at, it's been there for longer
    // than the debounce delay, so take it as the actual current state:

    // if the button state has changed:
    if (sw3reading != switch3State) {
      switch3State = sw3reading;

      // only toggle the out if the new button state is HIGH
      if (switch3State == HIGH) {
        light3State = !light3State;
        returnstate(3, light3State);
      }
    }
  }

    if ((millis() - lastDebounceTime4) > debounceDelay) {
    // whatever the reading is at, it's been there for longer
    // than the debounce delay, so take it as the actual current state:

    // if the button state has changed:
    if (sw4reading != switch4State) {
      switch4State = sw4reading;

      // only toggle the out if the new button state is HIGH
      if (switch4State == HIGH) {
        ulkoLightState = !ulkoLightState;
        returnstate(4, ulkoLightState);
      }
    }
  }  
     if ((millis() - lastDebounceTime5) > debounceDelay) {
    // whatever the reading is at, it's been there for longer
    // than the debounce delay, so take it as the actual current state:

    // if the button state has changed:
    if (sw5reading != ykmhswitch1State) {
      ykmhswitch1State = sw5reading;

      // only toggle the out if the new button state is HIGH
      if (ykmhswitch1State == HIGH) {
        ykmhLightState = !ykmhLightState;
        returnstate(5, ykmhLightState);
      }
    }
  }
  
  if ((millis() - lastDebounceTime6) > debounceDelay) {
    // whatever the reading is at, it's been there for longer
    // than the debounce delay, so take it as the actual current state:

    // if the button state has changed:
    if (sw6reading != ykmhswitch3State) {
      ykmhswitch3State = sw6reading;

      // only toggle the out if the new button state is HIGH
      if (ykmhswitch3State == HIGH) {
        ykphLightState = !ykphLightState;
        returnstate(6, ykphLightState);
      }
    }
  }
  
  if (stringComplete) {
    if (inputString == "1toggle;") {
      verantaLightState = !verantaLightState;
      switch1State = !switch1State;
      returnstate(1, verantaLightState);
    }
    if (inputString == "2toggle;") {
      light2State = !light2State;
      switch2State = !switch2State;
      returnstate(2, light2State);
    }
    if (inputString == "3toggle;") {
      light3State = !light3State;
      switch3State = !switch3State;
      returnstate(3, light3State);
    }
    if (inputString == "4toggle;") {
      ulkoLightState = !ulkoLightState;
      switch4State = !switch4State;
      returnstate(4, ulkoLightState);
    }
    if (inputString == "5toggle;") {
      ykmhLightState = !ykmhLightState;
      ykmhswitch1State = !ykmhswitch1State;
      returnstate(5, ykmhLightState);
    }
    if (inputString == "6toggle;") {
      ykphLightState = !ykphLightState;
      ykmhswitch3State = !ykmhswitch3State;
      returnstate(6, ykphLightState);
    }
  
    if (inputString == "1status;") {
      returnstate(1, verantaLightState);
    }
    if (inputString == "2status;") {
      returnstate(2, light2State);
    }
    if (inputString == "3status;") {
      returnstate(3, light3State);
    }
    if (inputString == "4status;") {
      returnstate(4, ulkoLightState);
    }
    if (inputString == "5status;") {
      returnstate(5, ykmhLightState);
    }
    if (inputString == "6status;") {
      returnstate(5, ykphLightState);
    }
    inputString = "";
    stringComplete = false;
  }

  // set the LED:

  digitalWrite(verantaLight, verantaLightState);  
  digitalWrite(out2, light2State);
  digitalWrite(out3, light3State);
  digitalWrite(ulkoLight, ulkoLightState);
  digitalWrite(ykMHLight, ykmhLightState);
  digitalWrite(ykPHLight, ykphLightState);
  
  // save the reading.  Next time through the loop,
  // it'll be the lastButtonState:
  lastSwitch1State = sw1reading;
  lastSwitch2State = sw2reading;
  lastSwitch3State = sw3reading;
  lastSwitch4State = sw4reading;
  lastykmhswitch1State = sw5reading;
  lastykmhswitch3State = sw6reading;
  
  getDataFromPC();
}

//=============

void getDataFromPC() {

    // receive data from PC and save it into inputBuffer
    
  if(Serial.available() > 0) {

    char x = Serial.read();

      // the order of these IF clauses is significant
      
    if (x == endMarker) {
      readInProgress = false;
      newDataFromPC = true;
      inputBuffer[bytesRecvd] = 0;
      parseData();
    }
    
    if(readInProgress) {
      inputBuffer[bytesRecvd] = x;
      bytesRecvd ++;
      if (bytesRecvd == buffSize) {
        bytesRecvd = buffSize - 1;
      }
    }

    if (x == startMarker) { 
      bytesRecvd = 0; 
      readInProgress = true;
    }
  }
}

//=============
 
void parseData() {

    // split the data into its parts
    
  char * strtokIndx; // this is used by strtok() as an index
  
  strtokIndx = strtok(inputBuffer,",");      // get the first part - the string
  strcpy(messageFromPC, strtokIndx); // copy it to messageFromPC
  
  strtokIndx = strtok(NULL, ","); // this continues where the previous call left off
  newFlashInterval = atoi(strtokIndx);     // convert this part to an integer
  
  strtokIndx = strtok(NULL, ","); 
  servoFraction = atof(strtokIndx);     // convert this part to a float

}

//=============

void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read(); 
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == ';') {
      stringComplete = true;
    } 
  }
}

void returnstate(int rele, int state) {

  switch(state) {
    case 0:
      rstate = "OFF";
      break;
    case 1:
      rstate = "ON";
      break;
  }
  
  switch(rele) {
    case 1:
      Serial.print("1state:" + rstate + "\n");
      break;
    case 2:
      Serial.print("2state:" + rstate + "\n");
      break;
    case 3:
      Serial.print("3state:" + rstate + "\n");
      break;
    case 4:
      Serial.print("4state:" + rstate + "\n");
      break;
    case 5:
      Serial.print("5state:" + rstate + "\n");
      break;
    case 6:
      Serial.print("6state:" + rstate + "\n");
      break;
  } 
}
