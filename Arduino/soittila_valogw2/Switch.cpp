#include "Switch.h"
#include <Arduino.h>
#include <ArduinoJson.h>


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
    if (!outputState) {
        Serial.println(" is on");
    } else {
        Serial.println(" is off");
    }
}

void Switch::printStatusJSON() {
    StaticJsonDocument<200> doc;
    doc["switchId"] = id;
    doc["outputState"] = !outputState;

    // Serialize the JSON object
    char buffer[200];
    serializeJson(doc, buffer);

    // Send the serialized JSON over the serial port
    Serial.println(buffer);
}


