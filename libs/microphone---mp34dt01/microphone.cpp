#include "pxt.h"

#include "LevelDetector.h"
#include "LevelDetectorSPL.h"

#define MICROPHONE_MIN 52.0f
#define MICROPHONE_MAX 120.0f

enum class DetectedSound {
    //% block="loud"
    Loud = 2,
    //% block="quiet"
    Quiet = 1
};

enum class SoundThreshold {
    //% block="loud"
    Loud = 2,
    //% block="quiet"
    Quiet = 1
};

namespace pxt {
codal::LevelDetectorSPL *getMicrophoneLevel();
} // namespace pxt

namespace input {

/**
 * Registers an event that runs when a sound is detected
 */
//% help=input/on-sound
//% blockId=input_on_sound block="on %sound sound"
//% parts="microphone"
//% weight=88 blockGap=12
//% group="microphone"
void onSound(DetectedSound sound, Action handler) {
    pxt::getMicrophoneLevel(); // wake up service
    const auto thresholdType =
        sound == DetectedSound::Loud ? LEVEL_THRESHOLD_HIGH : LEVEL_THRESHOLD_LOW;
    registerWithDal(DEVICE_ID_MICROPHONE, thresholdType, handler);
}

/**
 * Reads the loudness through the microphone from 0 (silent) to 255 (loud)
 */
//% help=input/sound-level
//% blockId=device_get_sound_level block="sound level"
//% parts="microphone"
//% weight=34 blockGap=8
//% group="microphone"
int soundLevel() {
    auto level = pxt::getMicrophoneLevel();
    if (NULL == level)
        return 0;
    const int micValue = level->getValue();
    const int scaled = max(MICROPHONE_MIN, min(micValue, MICROPHONE_MAX)) - MICROPHONE_MIN;
    return min(0xff, scaled * 0xff / (MICROPHONE_MAX - MICROPHONE_MIN));
}

/**
 * Read the main frequency through the microphone
 *
 */
//% help=input/sound-frequency
//% blockId=device_get_sound_frequency block="sound main frequency"
//% parts="microphone"
//% weight=34 blockGap=8
//% group="microphone"
int soundFrequency() {
    auto level = pxt::getMicrophoneLevel();
    if (NULL == level)
        return 0;
    const int micValue = level->getValue();
    const int scaled = max(MICROPHONE_MIN, min(micValue, MICROPHONE_MAX)) - MICROPHONE_MIN;
    return min(0xff, scaled * 0xff / (MICROPHONE_MAX - MICROPHONE_MIN));
}

/**
 * Sets the threshold for a sound type.
 */
//% help=input/set-sound-threshold
//% blockId=input_set_sound_threshold block="set %sound sound threshold to %value"
//% parts="microphone"
//% threshold.min=0 threshold.max=255 threshold.defl=128
//% weight=14 blockGap=8
//% advanced=true
//% group="microphone"
void setSoundThreshold(SoundThreshold sound, int threshold) {
    auto level = pxt::getMicrophoneLevel();
    if (NULL == level)
        return;

    threshold = max(0, min(0xff, threshold));
    const int scaled = MICROPHONE_MIN + threshold * (MICROPHONE_MAX - MICROPHONE_MIN) / 0xff;
    if (SoundThreshold::Loud == sound)
        level->setHighThreshold(scaled);
    else
        level->setLowThreshold(scaled);
}
} // namespace input
