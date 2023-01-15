#ifndef SWITCH_H
#define SWITCH_H


class Switch {
  private:
    int inputPin;
    int outputPin;
    int debounceDelay;
    int id;
    int *switchIds;
    bool inputState;
    bool lastInputState;
    unsigned long lastDebounceTime;
    bool outputState;

  public:
    Switch(int input, int output, int debounce,  int switchId, int *switchIds);
    void update();
    void setOutputState(bool state);
    void toggleOutputState();
    void printStatus();
};

#endif
