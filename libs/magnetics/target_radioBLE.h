#pragma once

#include "pxt.h"

#include "BLEDevice_Component.h"
#include "AdvertisingData.h"
#include "AdvertisingFlagsBuilder.h"

namespace pxt {
class WRadioBLE {
  private:
  public:
    codal::BLEDevice_Component *ble;
    AdvertisingData advData;
    AdvertisingData scanData;
    bool isAdvertisingStarted;
    bool isScanningStarted;

    WRadioBLE() : ble(nullptr), isAdvertisingStarted(false), isScanningStarted(false), isConfigured(false) {
        advData.setFlags(AdvertisingFlagsBuilder().addBrEdrNotSupported().addLeGeneralDiscoverableMode().build());
    }

    void configure();

  private:
    bool isConfigured;
};
} // namespace pxt
