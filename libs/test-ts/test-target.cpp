#include "pxt.h"
#include "test-target.h"

namespace test {
static TestCodal rootChain = nullptr;

/**
 * Get or Create a Test object
 */
//%
TestCodal getObject(DigitalInOutPin pin) {

    // Find if serial already created
    auto dev = rootChain;
    while (dev) {
        if (dev->matchPins(pin)) {
            return dev;
        }

        dev = dev->getNext();
    }

    // Create new one
    auto newTest = new TestTS(pin, rootChain);
    rootChain = newTest;
    return newTest;
}

} // namespace test

namespace TestCodalMethods {

/**
 * Set pin High
 */
//%
void setHigh(test::TestCodal test) {
    test->getPin()->setDigitalValue(1);
}

/**
 * Set pin Low
 */
//%
void setLow(test::TestCodal test) {
    test->getPin()->setDigitalValue(0);
}

} // namespace TestCodalMethods
