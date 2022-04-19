#include "pxt.h"
#include "pins.h"

namespace PwmOnlyPinMethods {
/**
* Emits a Pulse-width modulation (PWM) signal for a given duration.
* @param name the pin that modulate
* @param frequency frequency to modulate in Hz.
* @param ms duration of the pitch in milli seconds.
*/
//% blockId=pin_analog_pitch block="analog pitch|pin %pin|at (Hz)%frequency|for (ms) %ms"
//% help=pins/analog-pitch weight=4 async advanced=true blockGap=8
//% blockNamespace=pins
void analogPitch(PwmOnlyPin pin, int frequency, int ms) {
    if (frequency <= 0) {
        pin->setAnalogValue(0);
    } else {
        pin->setAnalogValue(512);
        pin->setAnalogPeriodUs(1000000/frequency);
    }

    if (ms > 0) {
        fiber_sleep(ms);
        pin->setAnalogValue(0);
        target_wait_us(5000);
    }
}

/**
* Plays a tone through the pin for the given duration.
* @param pin to play tone through
* @param frequency pitch of the tone to play in Hertz (Hz)
* @param ms tone duration in milliseconds (ms)
*/
//% help=music/play-tone weight=90
//% blockId=music_play_note block="play tone|on %pin|at %note=device_note|for %duration=device_beat" blockGap=8
//% parts="headphone" async trackArgs=0
//% blockNamespace=music
void playTone(PwmOnlyPin pin, int frequency, int ms) {
    analogPitch(pin, frequency, ms);
}

/**
* Plays a tone.
* @param pin to ring tone
* @param frequency pitch of the tone to play in Hertz (Hz)
*/
//% help=music/ring-tone weight=80
//% blockId=music_ring block="ring tone|on %pin|at %note=device_note" blockGap=8
//% parts="headphone" async trackArgs=0
//% blockNamespace=music
void ringTone(PwmOnlyPin pin, int frequency) {
    analogPitch(pin, frequency, 0);
}

/**
* Rests (plays nothing) for a specified time.
* @param pin to rest
* @param ms rest duration in milliseconds (ms)
*/
//% help=music/rest weight=79
//% blockId=music_rest block="rest|on %pin|for %duration=device_beat"
//% parts="headphone" async trackArgs=0
//% blockNamespace=music
void rest(PwmOnlyPin pin, int ms) {
    analogPitch(pin, 0, ms);
}
}