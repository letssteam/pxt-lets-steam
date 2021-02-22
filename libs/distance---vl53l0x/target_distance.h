#include "pxt.h"
#include "VL53L0X_Distance.h"
#include "STM32IotNode.h"

namespace pxt {
class WDistance {
  public:
    codal::Sensor* sensor;
    STM32IotNode iotNode;

    WDistance() : sensor( &(iotNode.distance) )
    {
    }
};
}