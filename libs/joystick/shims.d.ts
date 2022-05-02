// Auto-generated. Do not edit.



    //% color="#56515c" weight=98 icon="\uf276"
declare namespace Mjoystick {

    /**
     * @brief Gets the value of the given axis (Vertical/Horizontal)
     *
     * @param axis the axis to look the value for
     * @return int32_t in range [-100, 100]
     */
    //% block="get | %axis | axis"
    //% blockId="joystick_get_axis_block" shim=Mjoystick::getJoystickAxis
    function getJoystickAxis(axis: MJoystickAxis): int32;

    /**
     * @brief Checks if the joystick is oriented in the given direction
     *
     * @param direction the direction to check
     * @return true
     * @return false
     */
    //% block="joystick is pointing to %direction"
    //% blockId="is_joystick_pointing_to_block" shim=Mjoystick::isJoystingPointingTowards
    function isJoystingPointingTowards(direction: MJoystickDirection): boolean;

    /**
     * @brief Checks if the joystick's button is currently pressed
     *
     * @return true
     * @return false
     */
    //% block="button pressed"
    //% blockId="is_button_pressed_block" shim=Mjoystick::isJoystickButtonPressed
    function isJoystickButtonPressed(): boolean;

    /**
     * @brief Gives the joystick's deadzone, in [0, 100] range
     *
     * @return uint16_t
     */
    //% block="deadzone"
    //% blockId="get_deadzone_block" shim=Mjoystick::getJoystickDeadzone
    function getJoystickDeadzone(): uint16;

    /**
     * @brief Set the Joystick's the joystick deadzone, in [0, 100] range
     *
     * @param newDeadzone the new value of the deadzone
     */
    //% block="set deadzone to %newDeadzone"
    //% blockId="set_deadzone_block" shim=Mjoystick::setJoystickDeadzone
    function setJoystickDeadzone(newDeadzone: uint8): void;

    /**
     * @brief Creates a new event that triggers when the joystick is oriented in the given direction
     *
     * @param direction the direction that triggers the event
     * @param handler what the event does
     */
    //% block="on joysting pointing to %direction"
    //% blockId="on_joystick_pointing_to_block" shim=Mjoystick::onJoystickPointingTo
    function onJoystickPointingTo(direction: MJoystickDirection, handler: () => void): void;

    /**
     * @brief Creates a new event that triggers when the button is pressed, clicked, etc...
     *
     * @param eventType the type of event wanted
     * @param handler what the event does
     */
    //% block="on button %eventType"
    //% blockId="on_joystick_button_block" shim=Mjoystick::onButton
    function onButton(eventType: MJoystickButtonEvent, handler: () => void): void;
}

// Auto-generated. Do not edit. Really.
