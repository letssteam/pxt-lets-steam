// Auto-generated. Do not edit.
declare namespace input {

    /**
     * Do something when a gesture happens (like shaking the board).
     * @param gesture the type of gesture to track, eg: Gesture.Shake
     * @param body code to run when gesture is raised
     */
    //% help=input/on-gesture
    //% blockId=device_gesture_event block="on |%NAME"
    //% parts="accelerometer"
    //% gesture.fieldEditor="gridpicker"
    //% gesture.fieldOptions.width=220
    //% gesture.fieldOptions.columns=3
    //% group="Movement"
    //% weight=92 blockGap=12 shim=input::onGesture
    function onGesture(gesture: Gesture, body: () => void): void;

    /**
     * Get the acceleration value in milli-gravitys (when the board is laying flat with the screen up,
     * x=0, y=0 and z=-1023)
     * @param dimension TODO
     */
    //% help=input/acceleration
    //% blockId=device_acceleration block="acceleration (mg)|%NAME"
    //% parts="accelerometer"
    //% dimension.fieldEditor="gridpicker"
    //% dimension.fieldOptions.width=180
    //% dimension.fieldOptions.columns=2
    //% group="Movement"
    //% weight=42 blockGap=8 shim=input::acceleration
    function acceleration(dimension: Dimension): int32;

    /**
     * The pitch or roll of the device, rotation along the ``x-axis`` or ``y-axis``, in degrees.
     * @param kind TODO
     */
    //% help=input/rotation
    //% blockId=device_get_rotation block="rotation (°)|%NAME"
    //% parts="accelerometer"
    //% group="Movement"
    //% weight=38 shim=input::rotation
    function rotation(kind: Rotation): int32;

    /**
     * Sets the accelerometer sample range in gravities.
     * @param range a value describe the maximum strengh of acceleration measured
     */
    //% help=input/set-accelerometer-range
    //% blockId=device_set_accelerometer_range block="set accelerometer|range %range"
    //% weight=5 advanced=true
    //% parts="accelerometer"
    //% group="Movement"
    //% weight=15 blockGap=8 shim=input::setAccelerometerRange
    function setAccelerometerRange(range: AcceleratorRange): void;

    /**
     * Get the magnetic force value in ``micro-Teslas`` (``µT``). This function is not supported in the
     * simulator.
     * @param dimension TODO
     */
    //% help=input/magnetic-force weight=51
    //% blockId=device_get_magnetic_force block="magnetic force (µT)|%NAME"
    //% group="Movement" blockGap=8
    //% parts="compass" shim=input::magneticForce
    function magneticForce(dimension: Dimension): int32;

    /**
     * Get the current compass heading in degrees.
     */
    //% help=input/compass-heading
    //% weight=56
    //% blockId=device_heading block="compass heading (°)"
    //% group="Movement" blockGap=8
    //% parts="compass" shim=input::compassHeading
    function compassHeading(): int32;

    /**
     * Get the angular acceleration. This function is not supported in the simulator.
     * @param dimension TODO
     */
    //% help=input/gyroscopic-force weight=51
    //% blockId=device_get_gyroscopic_force block="angular acceleration|%NAME"
    //% group="Movement" blockGap=8
    //% parts="gyroscope" shim=input::gyroscopicForce
    function gyroscopicForce(dimension: Dimension): int32;
}

// Auto-generated. Do not edit. Really.
