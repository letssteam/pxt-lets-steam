#pragma once

#include "pxt.h"

#include "STM32AdvertisingBLE.h"
#include "STM32duinoBLE.h"

namespace pxt {
class WRadioBLE {
  private:
  public:
    codal::STM32AdvertisingBLE advertising;

    WRadioBLE() : advertising(DEVICE_ID_RADIO), isConfigured(false) {}
    void configure();

  private:
    bool isConfigured;
};
} // namespace pxt
