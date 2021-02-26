#include "pxt.h"
#include "Sensor.h"
#include "STM32IotNode.h"

namespace pxt {
class WBarometer {
  public:
    codal::Sensor* sensor;
    STM32IotNode iotNode;
    
    WBarometer() : sensor( &(iotNode.barometer) )
    {
    }
};
}