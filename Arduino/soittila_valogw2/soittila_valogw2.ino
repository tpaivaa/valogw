#include "Switch.h" // include the header file for the Switch class

const int numSwitches = 7;
// constants won't change. They're used here to
// set pin numbers:
const int verantaLightIn = 2;   // Verannan kytkin 1 input
const int parvekeLightIn = 3;   // Verannan kytkin 2 input
const int ykAulaLightIn = 4;   // Verannan kytkin 3 input
const int ulkoLightIn = 5;   // Verannan kytkin 4 input
const int ykMH1LightIn = 6;      // Ylakerran kytkin 1 input
const int ykPHLightIn = 7;      // Ylakerran kytkin 3 input
const int ykMH1LightOut = 8;        // Ylakerran Makuuhuone valo out ja kytkimen led output
const int ykPHLightOut = 9;        // Ylakerran Pesuhuone valo out ja kytkimen led output
const int verantaLightOut = 10;    // Verannan valo ja kytkimen1 led output
const int parvekeLightOut = 11;            //  valo ja kytkimen2 led output
const int ykAulaLightOut = 12;            //  valo ja kytkimen3 led output
const int ulkoLightOut = 13;       // Ulkovalo ja kytkimen4 led output
const int ykMH2LightIn = 14;        // Yk mh2 valo input pin
const int ykMH2LightOut = 15;       // Yk mh2 valo output pin


int switchIds[numSwitches] = {1,2,3,4,5,6,7};

Switch *switches[numSwitches];

void setup() {
    Serial.begin(115200);
    int inputPins[numSwitches] = {2, 3, 4, 5, 6, 7, 14};
    int outputPins[numSwitches] = {10,11,12,13,8,9,15};
    for (int i = 0; i < numSwitches; i++) {
        switches[i] = new Switch(inputPins[i], outputPins[i], 100, switchIds[i], switchIds);
    }
}

void loop() {
    for (int i = 0; i < numSwitches; i++) {
        switches[i]->update();
        switches[i]->serialControl();
    }
    delay(100);
}