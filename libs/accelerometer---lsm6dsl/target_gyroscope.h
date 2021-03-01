#include "pxt.h"
#include "axis.h"
#include "Pin.h"
#include "STM32IotNode.h"

namespace pxt {

// Wrapper classes
class WGyro {
  public:
    codal::Gyroscope& gyroscope;
    STM32IotNode iotNode;

    WGyro()
        : gyroscope(iotNode.gyroscope)
    {
    }
};
}