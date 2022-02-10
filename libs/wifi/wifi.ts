/**
 * Support for additional wifi services.
 */
//%weight=40 icon="\uf1eb" color=#ff5caa
namespace wifi {
  let attached: boolean = false;
  let initialized: boolean = false;

  let onReceivedHttpResponseHandler: (code: number, message: string) => void;

  function handleDataReceived(): void {
    onReceivedHttpResponseHandler(200, "OK");
  }

  function init() {
    if (initialized) return;
    onReceivedData(handleDataReceived);
    initialized = true;
  }

  /**
   * Registers code to run when data are available on the socket.
   */
  //% group=HTTP
  //% blockId=wifi_http_on_received_response
  //% block="on HTTP-Response received"
  //% draggableParameters=reporter
  //% blockGap = 16
  //% weight=39
  export function onReceivedHttpResponse(
    cb: (code: number, message: string) => void
  ): void {
    init();
    onReceivedHttpResponseHandler = cb;
  }

  /**
   * Get the number of networks visible.
   */
  //% weight=209
  //% blockId=wifi_networks_visible block="Get the number of visible wifi networks"
  //% shim=wifi::networksVisible
  export function networksVisible(): number {
    return 1;
  }

  /**
   * Connect to the wifi network.
   */
  //% weight=209
  //% blockId=wifi_attach block="connect to the wifi network|SSID %ssid|password %password"
  //% blockExternalInputs=1
  //% shim=wifi::attach
  export function attach(ssid: string, passphrase: string): void {
    attached = true;
  }

  /**
   * Check if we are connected to the wifi network.
   */
  //% weight=209
  //% blockId=wifi_is_connected block="network connected?"
  //% shim=wifi::isAttached
  export function isAttached(): boolean {
    return attached;
  }

  /**
   * Disconnect from the wifi network.
   */
  //% weight=209
  //% blockId=wifi_detach block="disconnect from wifi network"
  //% shim=wifi::detach
  export function detach(): void {
    attached = false;
  }

  /**
   * The HTTP get request.
   * @param url url to get
   * @param time set timeout, eg: 10000
   */
  //%group=HTTP
  //% weight=79
  //% blockId=wifi_http_get
  //% block="HTTP GET|host %host|path %urlPath|timeout(ms) %time"
  //% advanced=false
  export function sendHttpGet(
    host: string,
    urlPath: string,
    time: number
  ): void {
    executeHttpMethod(HttpMethod.GET, host, 80, urlPath, "", "", time);

    let url = "http://" + host + urlPath;
    console.log("HTTP GET: " + url);
  }

  /**
   * The HTTP post request.
   * @param time set timeout, eg: 10000
   */
  //%group=HTTP advanced=true
  //% weight=78
  //% blockId=wifi_http_post
  //% block="HTTP POST|host %host|path %urlPath|content %content|timeout(ms) %time"
  export function sendHttpPost(
    host: string,
    urlPath: string,
    content: string,
    time: number
  ): void {
    executeHttpMethod(HttpMethod.POST, host, 80, urlPath, "", content, time);
    let url = "http://" + host + urlPath;
    console.log("HTTP POST: " + url + " " + content);
  }
}
