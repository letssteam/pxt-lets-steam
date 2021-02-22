#include "pxt.h"
#include "Sensor.h"

namespace pxt {
class WDistance {
  public:
    codal::Sensor* sensor;
    
    WDistance()
    {
    }
};
}