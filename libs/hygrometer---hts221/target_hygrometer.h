#include "pxt.h"
#include "Sensor.h"
#include "STM32IotNode.h"

namespace pxt {
class WHygrometer {
  public:
    codal::Sensor* sensor;
    STM32IotNode iotNode;
    
    WHygrometer() : sensor( &(iotNode.hygrometer) )
    {
    }
};
}