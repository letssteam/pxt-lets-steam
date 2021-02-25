#include "pxt.h"
#include "Sensor.h"

namespace pxt {
class WHygrometer {
  public:
    codal::Sensor* sensor;
    
    WHygrometer()
    {
    }
};
}