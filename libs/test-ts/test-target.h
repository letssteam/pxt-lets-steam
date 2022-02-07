#pragma once
#include "pxt.h"

namespace test {

class TestTS {
  public:
    TestTS(DevicePin *pin, TestTS *next) : pin(pin), next(next) {}

    ~TestTS() {}

    bool matchPins(DevicePin *pin) { return pin == this->pin; }
    TestTS *getNext() { return next; }
    DevicePin *getPin() { return pin; }

  private:
    DevicePin *pin;
    TestTS *next;
};

typedef TestTS *TestCodal;

} // namespace test
