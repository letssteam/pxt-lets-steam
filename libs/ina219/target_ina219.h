#pragma once

#include "pxt.h"

constexpr uint8_t REGISTER_CONFIG = 0x00;
constexpr uint8_t REGISTER_SHUNT_VOLTAGE = 0x01;
constexpr uint8_t REGISTER_BUS_VOLTAGE = 0x02;
constexpr uint8_t REGISTER_POWER = 0x03;
constexpr uint8_t REGISTER_CURRENT = 0x04;
constexpr uint8_t REGISTER_CALIBRATION = 0x05;

// ===========================================================================================================================
// === See https://github.com/adafruit/Adafruit_INA219/blob/master/Adafruit_INA219.cpp for constants and calibration value ===
// ===========================================================================================================================

/** mask for bus voltage range **/
constexpr uint16_t INA219_CONFIG_BVOLTAGERANGE_MASK = 0x2000; // Bus Voltage Range Mask

/** bus voltage range values **/
constexpr uint16_t INA219_CONFIG_BVOLTAGERANGE_16V = (0x0000);
constexpr uint16_t INA219_CONFIG_BVOLTAGERANGE_32V = (0x2000);

/** mask for gain bits **/
constexpr uint16_t INA219_CONFIG_GAIN_MASK = 0x1800; // Gain Mask

/** values for gain bits **/
constexpr uint16_t INA219_CONFIG_GAIN_1_40MV = (0x0000);  // Gain 1, 40mV Range
constexpr uint16_t INA219_CONFIG_GAIN_2_80MV = (0x0800);  // Gain 2, 80mV Range
constexpr uint16_t INA219_CONFIG_GAIN_4_160MV = (0x1000); // Gain 4, 160mV Range
constexpr uint16_t INA219_CONFIG_GAIN_8_320MV = (0x1800); // Gain 8, 320mV Range

/** mask for bus ADC resolution bits **/
constexpr uint16_t INA219_CONFIG_BADCRES_MASK = 0x0780;

/** values for bus ADC resolution **/
constexpr uint16_t INA219_CONFIG_BADCRES_9BIT = (0x0000);             // 9-bit bus res = 0..511
constexpr uint16_t INA219_CONFIG_BADCRES_10BIT = (0x0080);            // 10-bit bus res = 0..1023
constexpr uint16_t INA219_CONFIG_BADCRES_11BIT = (0x0100);            // 11-bit bus res = 0..2047
constexpr uint16_t INA219_CONFIG_BADCRES_12BIT = (0x0180);            // 12-bit bus res = 0..4097
constexpr uint16_t INA219_CONFIG_BADCRES_12BIT_2S_1060US = (0x0480);  // 2 x 12-bit bus samples averaged together
constexpr uint16_t INA219_CONFIG_BADCRES_12BIT_4S_2130US = (0x0500);  // 4 x 12-bit bus samples averaged together
constexpr uint16_t INA219_CONFIG_BADCRES_12BIT_8S_4260US = (0x0580);  // 8 x 12-bit bus samples averaged together
constexpr uint16_t INA219_CONFIG_BADCRES_12BIT_16S_8510US = (0x0600); // 16 x 12-bit bus samples averaged together
constexpr uint16_t INA219_CONFIG_BADCRES_12BIT_32S_17MS = (0x0680);   // 32 x 12-bit bus samples averaged together
constexpr uint16_t INA219_CONFIG_BADCRES_12BIT_64S_34MS = (0x0700);   // 64 x 12-bit bus samples averaged together
constexpr uint16_t INA219_CONFIG_BADCRES_12BIT_128S_69MS = (0x0780);  // 128 x 12-bit bus samples averaged together

/** mask for shunt ADC resolution bits **/
constexpr uint16_t INA219_CONFIG_SADCRES_MASK = 0x0078; // Shunt ADC Resolution and Averaging Mask

/** values for shunt ADC resolution **/
constexpr uint16_t INA219_CONFIG_SADCRES_9BIT_1S_84US = (0x0000);     // 1 x 9-bit shunt sample
constexpr uint16_t INA219_CONFIG_SADCRES_10BIT_1S_148US = (0x0008);   // 1 x 10-bit shunt sample
constexpr uint16_t INA219_CONFIG_SADCRES_11BIT_1S_276US = (0x0010);   // 1 x 11-bit shunt sample
constexpr uint16_t INA219_CONFIG_SADCRES_12BIT_1S_532US = (0x0018);   // 1 x 12-bit shunt sample
constexpr uint16_t INA219_CONFIG_SADCRES_12BIT_2S_1060US = (0x0048);  // 2 x 12-bit shunt samples averaged together
constexpr uint16_t INA219_CONFIG_SADCRES_12BIT_4S_2130US = (0x0050);  // 4 x 12-bit shunt samples averaged together
constexpr uint16_t INA219_CONFIG_SADCRES_12BIT_8S_4260US = (0x0058);  // 8 x 12-bit shunt samples averaged together
constexpr uint16_t INA219_CONFIG_SADCRES_12BIT_16S_8510US = (0x0060); // 16 x 12-bit shunt samples averaged together
constexpr uint16_t INA219_CONFIG_SADCRES_12BIT_32S_17MS = (0x0068);   // 32 x 12-bit shunt samples averaged together
constexpr uint16_t INA219_CONFIG_SADCRES_12BIT_64S_34MS = (0x0070);   // 64 x 12-bit shunt samples averaged together
constexpr uint16_t INA219_CONFIG_SADCRES_12BIT_128S_69MS = (0x0078);  // 128 x 12-bit shunt samples averaged together

/** mask for operating mode bits **/
constexpr uint16_t INA219_CONFIG_MODE_MASK = 0x0007; // Operating Mode Mask

/** values for operating mode **/
constexpr uint16_t INA219_CONFIG_MODE_POWERDOWN = 0x00;            /**< power down */
constexpr uint16_t INA219_CONFIG_MODE_SVOLT_TRIGGERED = 0x01;      /**< shunt voltage triggered */
constexpr uint16_t INA219_CONFIG_MODE_BVOLT_TRIGGERED = 0x02;      /**< bus voltage triggered */
constexpr uint16_t INA219_CONFIG_MODE_SANDBVOLT_TRIGGERED = 0x03;  /**< shunt and bus voltage triggered */
constexpr uint16_t INA219_CONFIG_MODE_ADCOFF = 0x04;               /**< ADC off */
constexpr uint16_t INA219_CONFIG_MODE_SVOLT_CONTINUOUS = 0x05;     /**< shunt voltage continuous */
constexpr uint16_t INA219_CONFIG_MODE_BVOLT_CONTINUOUS = 0x06;     /**< bus voltage continuous */
constexpr uint16_t INA219_CONFIG_MODE_SANDBVOLT_CONTINUOUS = 0x07; /**< shunt and bus voltage continuous */

constexpr uint16_t configuration = INA219_CONFIG_BVOLTAGERANGE_32V | INA219_CONFIG_GAIN_8_320MV | INA219_CONFIG_BADCRES_12BIT |
                                   INA219_CONFIG_SADCRES_12BIT_1S_532US | INA219_CONFIG_MODE_SANDBVOLT_CONTINUOUS;
constexpr uint16_t calibration = 42 << 1;
constexpr uint32_t currentDivider_mA = 10;
constexpr float powerMultiplier_mW = 2.0f;

namespace pxt {
class WINA219 {
  public:
    WINA219() : address(0x80), i2c(*LOOKUP_PIN(SDA), *LOOKUP_PIN(SCL)) {}
    ~WINA219() {}

    void init() {
        send_calibration();
        send_configuration();
    }

    /**
     * @brief Get the Current in mA
     *
     * @return float
     */
    float getCurrent() {
        // Sometimes a sharp load will reset the INA219, which will
        // reset the cal register, meaning CURRENT and POWER will
        // not be available ... avoid this by always setting a cal
        // value even if it's an unfortunate extra step
        send_calibration();

        auto raw = i2c.readRegister(address, REGISTER_CURRENT, 2);

        float value = ((raw[0] << 8) | raw[1]);

        return value / currentDivider_mA;
    }

    /**
     * @brief Get the Bus Voltage in V
     *
     * @return float
     */
    float getBusVoltage() {

        // Sometimes a sharp load will reset the INA219, which will
        // reset the cal register, meaning CURRENT and POWER will
        // not be available ... avoid this by always setting a cal
        // value even if it's an unfortunate extra step
        send_calibration();

        auto raw = i2c.readRegister(address, REGISTER_BUS_VOLTAGE, 2);
        uint16_t value = (uint16_t)raw[0] << 8;
        value |= raw[1];
        value >>= 3;

        return (float)value * 0.004;
    }

    /**
     * @brief Get the Shunt Voltage in mV
     *
     * @return float
     */
    float getShuntVoltage() {

        // Sometimes a sharp load will reset the INA219, which will
        // reset the cal register, meaning CURRENT and POWER will
        // not be available ... avoid this by always setting a cal
        // value even if it's an unfortunate extra step
        send_calibration();

        auto raw = i2c.readRegister(address, REGISTER_SHUNT_VOLTAGE, 2);
        int16_t value = (raw[0] << 8);
        value |= raw[1];

        return (float)value * 0.01;
    }

    /**
     * @brief Get the Power in mW
     *
     * @return float
     */
    float getPower() {

        // Sometimes a sharp load will reset the INA219, which will
        // reset the cal register, meaning CURRENT and POWER will
        // not be available ... avoid this by always setting a cal
        // value even if it's an unfortunate extra step
        send_calibration();

        auto raw = i2c.readRegister(address, REGISTER_POWER, 2);
        float value = ((raw[0] << 8) | raw[1]);

        return value * powerMultiplier_mW;
    }

    void setAddress(uint16_t addr) { address = addr; }

  private:
    uint16_t address;
    codal::STM32I2C i2c;

    void send_calibration() {
        i2c.beginTransmission(address);
        i2c.write(REGISTER_CALIBRATION);
        i2c.write((uint8_t)((calibration >> 8) & 0x00FF));
        i2c.write((uint8_t)(calibration & 0x00FF));
        i2c.endTransmission();
    }

    void send_configuration() {
        i2c.beginTransmission(address);
        i2c.write(REGISTER_CONFIG);
        i2c.write((uint8_t)((configuration >> 8) & 0x00FF));
        i2c.write((uint8_t)(configuration & 0x00FF));
        i2c.endTransmission();
    }
};
} // namespace pxt
