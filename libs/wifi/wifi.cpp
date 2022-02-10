#include "pxt.h"
#include "target_wifi.h"

#define DEVICE_ID_WIFI_ISM43362_DATA_READY 2510
#define WIFI_ISM43362_EVT_DATA_READY 1

enum class HttpMethod {
    //%
    GET,
    //%
    POST,
    //%
    PUT,
    //%
    HEAD,
    //%
    DELETE,
    //%
    PATCH,
    //%
    OPTIONS,
    //%
    CONNECT,
    //%
    TRACE
};

namespace pxt {
SINGLETON(WWifi);
}

uint8_t _sock;

/**
 * Support for additional wifi services.
 */
//%weight=40 icon="\uf1eb"
namespace wifi {

int networksVisible() {
    IsmDrvClass &wifi = getWWifi()->wifi;
    wifi.ES_WIFI_ListAccessPoints();
    return wifi.ES_WIFI_GetApNbr();
}

void attach(String ssid, String passphrase) {
    IsmDrvClass &wifi = getWWifi()->wifi;
    uint8_t &wifi_status = getWWifi()->wifi_status;

    if (wifi.ES_WIFI_Connect(ssid->getUTF8Data(), passphrase->getUTF8Data(), ES_WIFI_SEC_WPA_WPA2) == ES_WIFI_STATUS_OK) {
        wifi_status = WL_CONNECTED;
    } else {
        wifi.ES_WIFI_Disconnect();
        wifi_status = WL_CONNECT_FAILED;
    }
}

bool isAttached() {
    uint8_t &wifi_status = getWWifi()->wifi_status;
    return wifi_status == WL_CONNECTED;
}

void detach() {
    IsmDrvClass &wifi = getWWifi()->wifi;
    uint8_t &wifi_status = getWWifi()->wifi_status;
    if (wifi_status != WL_NO_SHIELD) {
        wifi.ES_WIFI_Disconnect();
        wifi_status = WL_DISCONNECTED;
    }
}

/**
 * @brief  Start building up a packet to send to the remote host
 * @param  ip : IP to which to send the packet
 * @param  port : port to which to send the packet
 * @retval 1 if successful, 0 if there was a problem with the supplied IP address or port
 */
int connect(IPAddress ip, uint16_t port) {
    IsmDrvClass &wifi = getWWifi()->wifi;

    int8_t sock;
    if (_sock == NO_SOCKET_AVAIL) {
        sock = wifi.getFreeSocket(); // get next free socket
        if (sock != -1) {
            _sock = sock;
        }
    }
    if (_sock != NO_SOCKET_AVAIL) {
        // set connection parameter and start client
        wifi.ES_WIFI_SetConnectionParam(_sock, ES_WIFI_TCP_CONNECTION, port, ip);
        wifi.ES_WIFI_StartClientConnection(_sock);
        return 1;
    }
    return 0;
}

/**
 * @brief  Start building up a packet to send to the remote host
 * @param  host : host to which to send the packet
 * @param  port : port to which to send the packet
 * @retval 1 if successful, 0 if there was a problem with the supplied IP address or port
 */
int connect(String host, uint16_t port) {
    IsmDrvClass &wifi = getWWifi()->wifi;

    IPAddress remote_addr; // IP address of the host

    wifi.ES_WIFI_DNS_LookUp(host->getUTF8Data(), &remote_addr);
    return connect(remote_addr, port);
}

/**
 * @brief  Get socket state
   @param  None
 * @retval socket state
 */
uint8_t status() {
    IsmDrvClass &wifi = getWWifi()->wifi;

    if (_sock == 255) {
        return SOCKET_FREE;
    } else {
        return wifi.getSocketState(_sock);
    }
}

/**
 * @brief  Get connection state
   @param  None
 * @retval Socket state, FREE or BUSY
 */
uint8_t connected() {
    if (_sock == 255) {
        return 0;
    } else {
        return status();
    }
}

/**
 * @brief  Close the client connection
 * @param  None
 * @retval None
 */
void stop() {
    IsmDrvClass &wifi = getWWifi()->wifi;

    if (_sock == NO_SOCKET_AVAIL) {
        return;
    }
    wifi.ES_WIFI_StopServerSingleConn(_sock);
    _sock = NO_SOCKET_AVAIL;
}

/**
 * @brief  Read up to size bytes from the current packet and place them into buffer
 * @param  buffer : Where to place read data
 * @param  size : length of data to read
 * @retval Returns the number of bytes read, or 0 if none are available
 */
int read(char *buf, size_t size) {
    IsmDrvClass &wifi = getWWifi()->wifi;

    uint16_t receivedLength = 0; // number of data received

    wifi.ES_WIFI_ReceiveData(_sock, (uint8_t *)buf, size, &receivedLength, WIFI_TIMEOUT);
    if (receivedLength < size) {
        buf[receivedLength] = '\0'; // string end
    }
    return receivedLength;
}

/**
 * @brief  Write size bytes from buffer into the packet
 * @param  buf : data to write
 * @param  size : size of data to write
 * @retval size of write data
 */
size_t write(const char *buf, size_t size) {
    IsmDrvClass &wifi = getWWifi()->wifi;

    uint16_t sentLength = 0; // number of data really send
    uint8_t *temp = (uint8_t *)buf;

    wifi.ES_WIFI_SendResp(_sock, temp, size, &sentLength, WIFI_TIMEOUT);
    return sentLength;
}

String getHttpMethodString(HttpMethod method) {
    switch (method) {
    case HttpMethod::GET:
        return String("GET");
    case HttpMethod::POST:
        return String("POST");
    default:
        return String();
    }
}

/**
 * @brief Execute HTTP method.
 * @param method HTTP method, eg: HttpMethod.GET
 * @param host Host, eg: "google.com"
 * @param port Port, eg: 80
 * @param urlPath Path, eg: "/search?q=something"
 * @param headers Headers
 * @param body Body
 */
//% blockId=wifi_execute_http_method blockHidden=1
void executeHttpMethod(HttpMethod method, String host, int port, String urlPath, String headers, String body, int time) {
    String methodName = getHttpMethodString(method);

    if (connect(host, 80)) {
        write(methodName->getUTF8Data(), methodName->getUTF8Size());
        write(" ", 1);
        write(host->getUTF8Data(), host->getUTF8Size());
        write(" HTTP/1.1\r\n", 11);

        write("Host: ", 6);
        write(host->getUTF8Data(), host->getUTF8Size());
        write("\r\n", 2);

        write("Connection: Close\r\n", 19);

        if (headers->getLength() > 0) {
            write(headers->getUTF8Data(), headers->getUTF8Size());
        }
        if (body->getLength() > 0) {
            write("\r\n", 2);
            write(body->getUTF8Data(), body->getUTF8Size());
        }
        write("\r\n", 2);
    }
}

/**
 * Used internally by the library.
 */
//%
void onReceivedData(Action handler) {
    registerWithDal(DEVICE_ID_WIFI_ISM43362_DATA_READY, WIFI_ISM43362_EVT_DATA_READY, handler);
}

} // namespace wifi