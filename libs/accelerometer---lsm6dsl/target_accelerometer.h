#include "pxt.h"
#include "axis.h"
#include "Pin.h"
#include "STM32IotNode.h"

namespace pxt {

// Wrapper classes
class WAccel {
  public:
    codal::Accelerometer& acc;
    STM32IotNode iotNode;

    WAccel()
        : acc(iotNode.accelerometer)
    {    
    }
};
}