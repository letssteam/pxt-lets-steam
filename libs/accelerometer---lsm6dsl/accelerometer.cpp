#include "CoordinateSystem.h"
#include "I2C.h"
#include "Pin.h"
#include "axis.h"
#include "pxt.h"
#include "target_accelerometer.h"
#include "target_compass.h"
#include "target_gyroscope.h"

enum class Dimension {
    //% block=x
    X = 0,
    //% block=y
    Y = 1,
    //% block=z
    Z = 2,
    //% block=strength
    Strength = 3,
};

enum class Rotation {
    //% block=pitch
    Pitch = 0,
    //% block=roll
    Roll = 1,
};

enum class AcceleratorRange {
    /**
     * The accelerator measures forces up to 1 gravity
     */
    //%  block="1g"
    OneG = 1,
    /**
     * The accelerator measures forces up to 2 gravity
     */
    //%  block="2g"
    TwoG = 2,
    /**
     * The accelerator measures forces up to 4 gravity
     */
    //% block="4g"
    FourG = 4,
    /**
     * The accelerator measures forces up to 8 gravity
     */
    //% block="8g"
    EightG = 8
};

enum class Gesture {
    /**
     * Raised when shaken
     */
    //% block=shake
    Shake = ACCELEROMETER_EVT_SHAKE,
    /**
     * Raised when the device tilts up
     */
    //% block="tilt up"
    TiltUp = ACCELEROMETER_EVT_TILT_UP,
    /**
     * Raised when the device tilts down
     */
    //% block="tilt down"
    TiltDown = ACCELEROMETER_EVT_TILT_DOWN,
    /**
     * Raised when the screen is pointing left
     */
    //% block="tilt left"
    TiltLeft = ACCELEROMETER_EVT_TILT_LEFT,
    /**
     * Raised when the screen is pointing right
     */
    //% block="tilt right"
    TiltRight = ACCELEROMETER_EVT_TILT_RIGHT,
    /**
     * Raised when the screen faces up
     */
    //% block="face up"
    FaceUp = ACCELEROMETER_EVT_FACE_UP,
    /**
     * Raised when the screen is pointing up and the board is horizontal
     */
    //% block="face down"
    FaceDown = ACCELEROMETER_EVT_FACE_DOWN,
    /**
     * Raised when the board is falling!
     */
    //% block="free fall"
    FreeFall = ACCELEROMETER_EVT_FREEFALL,
    /**
     * Raised when a 3G shock is detected
     */
    //% block="3g"
    ThreeG = ACCELEROMETER_EVT_3G,
    /**
     * Raised when a 6G shock is detected
     */
    //% block="6g"
    SixG = ACCELEROMETER_EVT_6G,
    /**
     * Raised when a 8G shock is detected
     */
    //% block="8g"
    EightG = ACCELEROMETER_EVT_8G
};

namespace pxt {

SINGLETON(WAccel);
SINGLETON(WCompas);
SINGLETON(WGyro);
} // namespace pxt

namespace input {
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
//% weight=92 blockGap=12
void onGesture(Gesture gesture, Action body) {
    auto acc = getWAccel()->acc;
    acc->requestUpdate();
    int gi = (int)gesture;
    if (gi == ACCELEROMETER_EVT_3G && acc->getRange() < 3)
        acc->setRange(4);
    else if ((gi == ACCELEROMETER_EVT_6G || gi == ACCELEROMETER_EVT_8G) && acc->getRange() < 6)
        acc->setRange(8);
    registerWithDal(DEVICE_ID_GESTURE, gi, body);
}

int getAccelerationStrength() {
    auto acc = getWAccel()->acc;
    float x = acc->getX();
    float y = acc->getY();
    float z = acc->getZ();
    return (int)sqrtf(x * x + y * y + z * z);
}

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
//% weight=42 blockGap=8
int acceleration(Dimension dimension) {
    switch (dimension) {
    case Dimension::X:
        return getWAccel()->acc->getX();
    case Dimension::Y:
        return getWAccel()->acc->getY();
    case Dimension::Z:
        return getWAccel()->acc->getZ();
    case Dimension::Strength:
        return getAccelerationStrength();
    }
    return 0;
}

/**
 * The pitch or roll of the device, rotation along the ``x-axis`` or ``y-axis``, in degrees.
 * @param kind TODO
 */
//% help=input/rotation
//% blockId=device_get_rotation block="rotation (°)|%NAME"
//% parts="accelerometer"
//% group="Movement"
//% weight=38
int rotation(Rotation kind) {
    switch (kind) {
    case Rotation::Pitch:
        return getWAccel()->acc->getPitch();
    case Rotation::Roll:
        return getWAccel()->acc->getRoll();
    }
    return 0;
}

/**
 * Sets the accelerometer sample range in gravities.
 * @param range a value describe the maximum strengh of acceleration measured
 */
//% help=input/set-accelerometer-range
//% blockId=device_set_accelerometer_range block="set accelerometer|range %range"
//% weight=5 advanced=true
//% parts="accelerometer"
//% group="Movement"
//% weight=15 blockGap=8
void setAccelerometerRange(AcceleratorRange range) {
    getWAccel()->acc->setRange((int)range);
}

/**
 * Get the magnetic force value in ``micro-Teslas`` (``µT``). This function is not supported in the
 * simulator.
 * @param dimension TODO
 */
//% help=input/magnetic-force weight=51
//% blockId=device_get_magnetic_force block="magnetic force (µT)|%NAME"
//% group="Movement" blockGap=8
//% parts="compass"
int magneticForce(Dimension dimension) {
    if (!getWCompas()->magnetometer->isCalibrated())
        getWCompas()->magnetometer->calibrate();

    switch (dimension) {
    case Dimension::X:
        return getWCompas()->magnetometer->getX();
    case Dimension::Y:
        return getWCompas()->magnetometer->getY();
    case Dimension::Z:
        return getWCompas()->magnetometer->getZ();
    case Dimension::Strength:
        return getWCompas()->magnetometer->getFieldStrength();
    }
    return 0;
}

/**
 * Get the current compass heading in degrees.
 */
//% help=input/compass-heading
//% weight=56
//% blockId=device_heading block="compass heading (°)"
//% group="Movement" blockGap=8
//% parts="compass"
int compassHeading() {
    return getWCompas()->magnetometer->heading();
}

/**
 * Get the angular acceleration. This function is not supported in the simulator.
 * @param dimension TODO
 */
//% help=input/gyroscopic-force weight=51
//% blockId=device_get_gyroscopic_force block="angular acceleration|%NAME"
//% group="Movement" blockGap=8
//% parts="gyroscope"
int gyroscopicForce(Dimension dimension) {
    switch (dimension) {
    case Dimension::X:
        return getWGyro()->gyroscope->getX();
    case Dimension::Y:
        return getWGyro()->gyroscope->getY();
    case Dimension::Z:
        return getWGyro()->gyroscope->getZ();
    case Dimension::Strength:
        return 0; // getWGyro()->gyroscope.getStrength();
    }
    return 0;
}

} // namespace input
