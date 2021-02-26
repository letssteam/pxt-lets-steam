#include "pxt.h"
#include "Sensor.h"

namespace pxt {
class WBarometer {
  public:
    codal::Sensor* sensor;
    
    WBarometer()
    {
    }
};
}