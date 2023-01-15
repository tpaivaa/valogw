#ifndef SWITCH_H
#define SWITCH_H


class Switch {
  private:
    int inputPin;
    int outputPin;
    int debounceDelay;
    int id;
    bool inputState;
    bool lastInputState;
    unsigned long lastDebounceTime;
    bool outputState;

  public:
    Switch(int input, int output, int debounce,  int switchId);
    void update();
    void serialControl();
};

#endif
