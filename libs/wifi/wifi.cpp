#include "pxt.h"
#include "target_wifi.h"

namespace pxt {
SINGLETON(WWifi);
}

/**
 * Support for additional wifi services.
 */
//%weight=40 icon="\uf1eb"
namespace wifi {

/**
 */
//%
int numberOfNetworksVisible() {
    IsmDrvClass &wifi = getWWifi()->wifi;
    wifi.ES_WIFI_ListAccessPoints();
    return wifi.ES_WIFI_GetApNbr();
}

} // namespace wifi