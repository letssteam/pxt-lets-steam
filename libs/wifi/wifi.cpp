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

/**
 */
//%
void connectToANetwork(String ssid, String passphrase) {
    IsmDrvClass &wifi = getWWifi()->wifi;
    uint8_t &wifi_status = getWWifi()->wifi_status;

    if (wifi.ES_WIFI_Connect(ssid->getUTF8Data(), passphrase->getUTF8Data(), ES_WIFI_SEC_WPA_WPA2) == ES_WIFI_STATUS_OK) {
        wifi_status = WL_CONNECTED;
    } else {
        wifi.ES_WIFI_Disconnect();
        wifi_status = WL_CONNECT_FAILED;
    }
}

/**
 */
//%
bool connected() {
    uint8_t &wifi_status = getWWifi()->wifi_status;
    return wifi_status == WL_CONNECTED;
}

/**
 */
//%
void disconnectFromANetwork() {
    IsmDrvClass &wifi = getWWifi()->wifi;
    uint8_t &wifi_status = getWWifi()->wifi_status;
    if (wifi_status != WL_NO_SHIELD) {
        wifi.ES_WIFI_Disconnect();
        wifi_status = WL_DISCONNECTED;
    }
}

} // namespace wifi