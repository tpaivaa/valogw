#include "Switch.h"
#include <Arduino.h>


Switch::Switch(int input, int output, int debounce, int switchId) {
    // Assign the constructor arguments to class variables
    inputPin = input;
    outputPin = output;
    debounceDelay = debounce;
    id = switchId;

    // Configure the input and output pins
    pinMode(inputPin, INPUT_PULLUP);
    pinMode(outputPin, OUTPUT);

    // Read the initial state of the input pin
    inputState = digitalRead(inputPin);
    lastInputState = inputState;

    // Initialize the debounce time
    lastDebounceTime = 0;

    // Initialize the output state
    outputState = false;
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
        if (outputState) {
            Serial.println(" turned on");
        } else {
            Serial.println(" turned off");
          }
      }
    }
  }

  lastInputState = currentState;
}

void Switch::serialControl() {
    if (Serial.available() > 0) {
        char input = Serial.read();
        if (input == 's') {
            input = Serial.read();
            int switchId = input - '0';
            if (switchId == id) {
                input = Serial.read();
                if (input == '1') {
                    outputState = false;
                    digitalWrite(outputPin, outputState);
                } else if (input == '0') {
                    outputState = true;
                    digitalWrite(outputPin, outputState);
                } else if (input == 't') {
                    outputState = !outputState;
                    digitalWrite(outputPin, outputState);
                } else if (input == 'r') {
                    Serial.print("Switch ");
                    Serial.print(id);
                    if (outputState) {
                        Serial.print(" ");
                        Serial.print(outputState);
                        Serial.println(" is on");
                    } else {
                        Serial.print(" ");
                        Serial.print(outputState);
                        Serial.println(" is off");
                    }
                }
                Serial.print("Switch ");
                Serial.print(id);
                if (outputState) {
                    Serial.println(" turned on");
                } else {
                    Serial.println(" turned off");
                  }
            }
        }

    }
}


