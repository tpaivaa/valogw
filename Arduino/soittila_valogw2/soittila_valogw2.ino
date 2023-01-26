#include "Switch.h" // include the header file for the Switch class
#include <ArduinoJson.h>

const int numSwitches = 7;
const int verantaLightIn = 22;
const int parvekeLightIn = 24;
const int ykAulaLightIn = 26;
const int ulkoLightIn = 28;
const int ykMH1LightIn = 30;
const int ykPHLightIn = 32;
const int verantaLightOut = 23;
const int parvekeLightOut = 25;
const int ykAulaLightOut = 27;
const int ulkoLightOut = 29;
const int ykMH1LightOut = 31;
const int ykPHLightOut = 33;

const int ykMH2LightIn = 34;
const int ykMH2LightOut = 35;

int switchIds[numSwitches] = {1,2,3,4,5,6,7};

Switch *switches[numSwitches];

void setup() {
    Serial.begin(115200);
    Serial2.begin(115200);
    Serial2.println("Connection...");
    int inputPins[numSwitches] = {verantaLightIn, parvekeLightIn, ykAulaLightIn, ulkoLightIn, ykMH1LightIn, ykPHLightIn, ykMH2LightIn};
    int outputPins[numSwitches] = {verantaLightOut, parvekeLightOut, ykAulaLightOut, ulkoLightOut, ykMH1LightOut, ykPHLightOut, ykMH2LightOut};
    for (int i = 0; i < numSwitches; i++) {
        switches[i] = new Switch(inputPins[i], outputPins[i], 50, switchIds[i], switchIds);
    }
}

void loop() {
    for (int i = 0; i < numSwitches; i++) {
        switches[i]->update();
    }
    handleSerialInput();
    delay(50);
}

void handleSerialInput() {
    if (Serial.available() > 0) {
        char input = Serial.read();
        if (input == 's') {
            input = Serial.read();
            int switchId = input - '0';
            input = Serial.read();
            for (int i = 0; i < numSwitches; i++) {
                if (switchIds[i] == switchId) {
                    if (input == '1') {
                        switches[i]->setOutputState(LOW);
                    } else if (input == '0') {
                        switches[i]->setOutputState(HIGH);
                    } else if (input == 't') {
                        switches[i]->toggleOutputState();
                    } else if (input == 'r') {
                        switches[i]->printStatus();
                    } else if (input == 'j') {
                        switches[i]->printStatusJSON(1);
                    }
                }
            }
        }
    }
    if (Serial2.available() > 0) {
        char input[256];
        int i = 0;
        while(Serial2.available()){
            input[i] = (char)Serial2.read();
            i++;
        }
        input[i] = '\0';
        DynamicJsonDocument jsonDoc(1024);
        DeserializationError error = deserializeJson(jsonDoc, input);
        //serializeJsonPretty(jsonDoc, Serial2);
        if (!error) {
            int switchId = jsonDoc["switchId"];
            String outputStateString = jsonDoc["outputState"];
            String messageType = jsonDoc["message"];
            if (messageType == "command") {
              for (int i = 0; i < numSwitches; i++) {
                  if (switchIds[i] == switchId) {
                      if (outputStateString == "true") {
                          switches[i]->setOutputState(LOW);
                      } else if (outputStateString == "false") {
                          switches[i]->setOutputState(HIGH);
                      } else if (outputStateString == "toggle") {
                          switches[i]->toggleOutputState();
                      } else if (outputStateString == "query") {
                          switches[i]->printStatusJSON(2);
                      }
                  }
              }
            }
        }
    }
}
