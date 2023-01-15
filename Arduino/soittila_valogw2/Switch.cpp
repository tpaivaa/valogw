#include "Switch.h"
#include <Arduino.h>


Switch::Switch(int input, int output, int debounce, int switchId, int *switchIds) {
    // Assign the constructor arguments to class variables
    this->inputPin = input;
    this->outputPin = output;
    this->debounceDelay = debounce;
    this->id = switchId;
    this->switchIds = switchIds;

    // Configure the input and output pins
    pinMode(inputPin, INPUT_PULLUP);
    digitalWrite(outputPin, HIGH);
    pinMode(outputPin, OUTPUT);

    // Read the initial state of the input pin
    this->inputState = digitalRead(inputPin);
    this->lastInputState = inputState;

    // Initialize the debounce time
    this->lastDebounceTime = 0;

    // Initialize the output state
    this->outputState = true;
}

void Switch::update() {
  int currentState = digitalRead(inputPin);

  if (currentState != lastInputState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (currentState != inputState) {
      inputState = currentState;
      if (inputState == LOW) {
        outputState = !outputState;
        digitalWrite(outputPin, outputState);
        Serial.print("Switch ");
        Serial.print(id);
        if (!outputState) {
            Serial.println(" turned on");
        } else {
            Serial.println(" turned off");
          }
      }
    }
  }

  lastInputState = currentState;
}

// void Switch::serialControl(int index) {
//     if (Serial.available() > 0) {
//         char input = Serial.read();
//         // Serial.print("Received: ");
//         // Serial.println(input);
//         if (input == 's') {
//             input = Serial.read();
//             int switchId = input - '0';
//             // Serial.print("Received: ");
//             // Serial.println(input);
//             Serial.print("switchId: ");
//             Serial.println(switchId);
//             Serial.print("Id: ");
//             Serial.println(this->id);
//             // Serial.print("inputPin: ");
//             // Serial.println(this->inputPin);
//             // Serial.print("Received: ");
//             // Serial.println(input);
//             // Serial.print("id: ");
//             // Serial.println(switchIds[index]);
//             if (switchId == this->id) {
//                 input = Serial.read();
//                 Serial.print("Received: ");
//                 Serial.println(input);
//                 if (input == '1') {
//                     outputState = LOW;
//                     digitalWrite(outputPin, outputState);
//                 } else if (input == '0') {
//                     outputState = HIGH;
//                     digitalWrite(outputPin, outputState);
//                 } else if (input == 't') {
//                     outputState = !outputState;
//                     digitalWrite(outputPin, outputState);
//                 } else if (input == 'r') {
//                         Serial.print("Switch ");
//                         Serial.print(id);
//                         if (outputState) {
//                             Serial.print(" ");
//                             Serial.print(outputState);
//                             Serial.println(" is on");
//                         } else {
//                             Serial.print(" ");
//                             Serial.print(outputState);
//                             Serial.println(" is off");
//                         }
//                 }
//                 Serial.print("Switch ");
//                 Serial.print(id);
//                 if (!outputState) {
//                     Serial.println(" turned on");
//                 } else {
//                     Serial.println(" turned off");
//                 }
//             }
//         }
//     }
// }

void Switch::setOutputState(bool state) {
    outputState = state;
    digitalWrite(outputPin, outputState);
}

void Switch::toggleOutputState() {
    outputState = !outputState;
    digitalWrite(outputPin, outputState);
}

void Switch::printStatus() {
    Serial.print("Switch ");
    Serial.print(id);
    if (outputState) {
        Serial.println(" is on");
    } else {
        Serial.println(" is off");
    }
}


