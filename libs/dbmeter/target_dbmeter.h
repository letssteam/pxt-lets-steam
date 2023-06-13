#include "pxt.h"
#include "Sensor.h"

namespace pxt {
class WDBMeter {
  public:
    codal::Sensor *sensor;

    WDBMeter() {}
};
} // namespace pxt