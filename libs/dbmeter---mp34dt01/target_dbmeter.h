#include "MP34DT01_dbmeter.h"
#include "pxt.h"

namespace pxt {
class WDBMeter {
  public:
    codal::MP34DT01_dBMeter *sensor;

    WDBMeter() : sensor(new codal::MP34DT01_dBMeter(DEVICE_ID_SYSTEM_LEVEL_DETECTOR_SPL, 1023, 200)) {}
    ~WDBMeter() { delete sensor; }
};
} // namespace pxt