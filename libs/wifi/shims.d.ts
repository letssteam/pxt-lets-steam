// Auto-generated. Do not edit.


    /**
     * Support for additional wifi services.
     */
    //%weight=40 icon="\uf1eb"
declare namespace wifi {

    /**
     */
    //% shim=wifi::numberOfNetworksVisible
    function numberOfNetworksVisible(): int32;

    /**
     */
    //% shim=wifi::connectToANetwork
    function connectToANetwork(ssid: string, passphrase: string): void;

    /**
     */
    //% shim=wifi::connected
    function connected(): boolean;

    /**
     */
    //% shim=wifi::disconnectFromANetwork
    function disconnectFromANetwork(): void;
}

// Auto-generated. Do not edit. Really.
