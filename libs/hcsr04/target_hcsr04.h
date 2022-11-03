#include "HCSR04Sensor.h"
#include "pxt.h"

namespace pxt {
class WHCSR04 {
  public:
    codal::HCSR04Sensor *hcsr04;
    Action actNear;
    Action actFar;

    WHCSR04() { 
      hcsr04 = new codal::HCSR04Sensor(*LOOKUP_PIN(D6), *LOOKUP_PIN(D7), 1337);
    }
};
} // namespace pxt
