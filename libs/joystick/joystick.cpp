#include "joystick_target.h"

enum class MJoystickDirection {
    //% block="Left"
    Left = 0,
    //% block="Top"
    Top = 1,
    //% block="Right"
    Right = 2,
    //% block="Bottom"
    Bottom = 3
};
enum class MJoystickButtonEvent {
    //% block="Click"
    Click = 0,
    //% block="LongClick"
    LongClick = 1,
    //% block="Up"
    Up = 2,
    //% block="Down"
    Down = 3,
    //% block="Hold"
    Hold = 4,
    //% block="DoubleClick"
    DoubleClick = 5
};

enum class MJoystickAxis {
    //% block="Horizontal"
    Horizontal,
    //% block="Vertical"
    Vertical
};

namespace pxt {
SINGLETON(WJoystick);
}
//% color=#282828 icon="\uf276"
namespace Joystick {

/**
 * @brief Gets the value of the given axis (Vertical/Horizontal)
 *
 * @param axis the axis to look the value for
 * @return int32_t in range [-100, 100]
 */
//% block="%axis | axis"
//% blockId="joystick_get_axis_block"
//% parts="joystick"
int getJoystickAxis(MJoystickAxis axis) {
    return getWJoystick()->joystick->getAxis(static_cast<codal::JoystickAxis>(axis));
}

/**
 * @brief Checks if the joystick is oriented in the given direction
 *
 * @param direction the direction to check
 * @return true
 * @return false
 */
//% block="joystick is pointing to %direction"
//% blockId="is_joystick_pointing_to_block"
//% parts="joystick"
bool isJoystickPointingTowards(MJoystickDirection direction) {
    return getWJoystick()->joystick->isJoystickPointingTo(static_cast<codal::JoystickDirection>(direction));
}

/**
 * @brief Checks if the joystick's button is currently pressed
 *
 * @return true
 * @return false
 */
//% block="button is pressed"
//% blockId="is_button_pressed_block"
//% parts="joystick"
bool isJoystickButtonPressed() {
    return getWJoystick()->joystick->isButtonPressed();
}

/**
 * @brief Gives the joystick's deadzone, in [0, 100] range
 *
 * @return uint16_t
 */
//% block="deadzone"
//% blockId="get_deadzone_block"
//% parts="joystick"
uint16_t getJoystickDeadzone() {
    return getWJoystick()->joystick->getDeadzone();
}

/**
 * @brief Set the Joystick's the joystick deadzone, in [0, 100] range
 *
 * @param newDeadzone the new value of the deadzone
 */
//% block="set deadzone to %newDeadzone"
//% blockId="set_deadzone_block"
//% parts="joystick"
void setJoystickDeadzone(uint8_t newDeadzone) {
    getWJoystick()->joystick->setDeadzone(newDeadzone);
}

void callAction() {
    runInParallel(getWJoystick()->act);
}

/**
 * @brief Creates a new event that triggers when the joystick is oriented in the given direction
 *
 * @param direction the direction that triggers the event
 * @param handler what the event does
 */
//% block="on joysting pointing to %direction"
//% blockId="on_joystick_pointing_to_block"
//% parts="joystick"
void onJoystickPointingTo(MJoystickDirection direction, Action handler) {
    getWJoystick()->act = handler;
    getWJoystick()->joystick->registerDirectionEvent(static_cast<codal::JoystickDirection>(direction), callAction);
}

/**
 * @brief Creates a new event that triggers when the button is pressed, clicked, etc...
 *
 * @param eventType the type of event wanted
 * @param handler what the event does
 */
//% block="on button %eventType"
//% blockId="on_joystick_button_block"
//% parts="joystick"
void onButton(MJoystickButtonEvent eventType, Action handler) {
    getWJoystick()->act = handler;
    getWJoystick()->joystick->registerJoystickButtonEvent(static_cast<codal::JoystickButtonEvent>(eventType), callAction);
}
} // namespace Joystick