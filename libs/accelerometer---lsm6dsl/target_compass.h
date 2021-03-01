#include "pxt.h"
#include "axis.h"
#include "Pin.h"
#include "STM32IotNode.h"

namespace pxt {

// Wrapper classes
class WCompas {
  public:
    codal::Compass& magnetometer;
    STM32IotNode iotNode;

    WCompas()
        : magnetometer(iotNode.magnetometer)
    {
    }
};
}