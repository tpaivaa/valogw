#include "Switch.h" // include the header file for the Switch class

const int numSwitches = 7;
const int verantaLightIn = 2;
const int parvekeLightIn = 3;
const int ykAulaLightIn = 4;
const int ulkoLightIn = 5;
const int ykMH1LightIn = 6;
const int ykPHLightIn = 7;
const int ykMH1LightOut = 8;
const int ykPHLightOut = 9;
const int verantaLightOut = 10;
const int parvekeLightOut = 11;
const int ykAulaLightOut = 12;
const int ulkoLightOut = 13;
const int ykMH2LightIn = 14;
const int ykMH2LightOut = 15;

int switchIds[numSwitches] = {1,2,3,4,5,6,7};

Switch *switches[numSwitches];

void setup() {
    Serial.begin(115200);
    int inputPins[numSwitches] = {verantaLightIn, parvekeLightIn, ykAulaLightIn, ulkoLightIn, ykMH1LightIn, ykPHLightIn, ykMH2LightIn};
    int outputPins[numSwitches] = {verantaLightOut, parvekeLightOut, ykAulaLightOut, ulkoLightOut, ykMH1LightOut, ykPHLightOut, ykMH2LightOut};
    for (int i = 0; i < numSwitches; i++) {
        switches[i] = new Switch(inputPins[i], outputPins[i], 100, switchIds[i], switchIds);
    }
}

void loop() {
    for (int i = 0; i < numSwitches; i++) {
        switches[i]->update();
    }
    handleSerialInput();
    delay(100);
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
                    }
                }
            }
        }
    }
}
