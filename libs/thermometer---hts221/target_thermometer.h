#include "pxt.h"
#include "hts221_thermometer.h"
#include "STM32IotNode.h"

namespace pxt {
class WTemp {
  public:
    codal::Sensor* sensor;
    STM32IotNode iotNode;

    WDistance() : sensor( &(iotNode.thermometer) )
    {
    }
};
}
