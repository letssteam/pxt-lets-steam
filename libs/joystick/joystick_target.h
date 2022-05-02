#include "pxt.h"
#include "joystick.h"

namespace pxt {
class WJoystick {
  public:
    codal::Joystick *joystick;
    Action act;

    WJoystick() { joystick = new codal::Joystick(*LOOKUP_PIN(A0), *LOOKUP_PIN(A1), *LOOKUP_PIN(D2)); }
};
} // namespace pxt