// Auto-generated. Do not edit.


    /**
     * Support for additional wifi services.
     */
    //%weight=40 icon="\uf1eb"
declare namespace wifi {

    /**
     * @brief Execute HTTP method.
     * @param method HTTP method, eg: HttpMethod.GET
     * @param host Host, eg: "google.com"
     * @param port Port, eg: 80
     * @param urlPath Path, eg: "/search?q=something"
     * @param headers Headers
     * @param body Body
     */
    //% blockId=wifi_execute_http_method blockHidden=1 shim=wifi::executeHttpMethod
    function executeHttpMethod(method: HttpMethod, host: string, port: int32, urlPath: string, headers: string, body: string, time: int32): void;

    /**
     * Used internally by the library.
     */
    //% shim=wifi::onReceivedData
    function onReceivedData(handler: () => void): void;
}

// Auto-generated. Do not edit. Really.
