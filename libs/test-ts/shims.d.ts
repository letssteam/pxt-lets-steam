// Auto-generated. Do not edit.
declare namespace test {

    /**
     * Get or Create a Test object
     */
    //% shim=test::getObject
    function getObject(pin: DigitalInOutPin): TestCodal;
}


declare interface TestCodal {
    /**
     * Set pin High
     */
    //% shim=TestCodalMethods::setHigh
    setHigh(): void;

    /**
     * Set pin Low
     */
    //% shim=TestCodalMethods::setLow
    setLow(): void;
}

// Auto-generated. Do not edit. Really.
