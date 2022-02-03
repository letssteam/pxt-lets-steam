#include "pxt.h"
#include "ISM43362_M3G_L44_driver.h"

namespace pxt {
class WWifi {
  private:
    CODAL_SPI *spi;

  public:
    IsmDrvClass wifi;
    uint8_t wifi_status = WL_IDLE_STATUS;

    WWifi()
        : spi(pxt::getSPI(LOOKUP_PIN(WIFI_ISM43362_MOSI), LOOKUP_PIN(WIFI_ISM43362_MISO), LOOKUP_PIN(WIFI_ISM43362_SCK))),
          wifi(spi, LOOKUP_PIN(WIFI_ISM43362_CS), LOOKUP_PIN(WIFI_ISM43362_COMMAND_DATA_READY), LOOKUP_PIN(WIFI_ISM43362_RESET),
               LOOKUP_PIN(WIFI_ISM43362_WAKE_UP)) {}
};
} // namespace pxt