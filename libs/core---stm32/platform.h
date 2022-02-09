#ifndef __PXT_PLATFORM_H
#define __PXT_PLATFORM_H

#include "Image.h"
#include "MultiButton.h"
#include "STM32I2C.h"
#include "STM32Pin.h"
#include "STM32SPI.h"
#include "STM32Serial.h"
#include "Timer.h"

#include "pinmap.h"

#define BOOTLOADER_START 0x08000000
#define BOOTLOADER_END 0x08008000

#ifdef STM32F4
#define SETTINGS_MAGIC_0 0x10476643
#define SETTINGS_MAGIC_1 0x2e9a5026

struct F4_Settings {
    uint32_t magic0;
    uint32_t magic1;
    int *configValues;
    uint32_t hseValue;
    const char *info_uf2;
    const char *manufacturer;
    const char *device;
    uint32_t reserved[16 - 7];
};

#define UF2_BINFO ((F4_Settings *)(BOOTLOADER_END - sizeof(F4_Settings)))
#define UF2_INFO_TXT UF2_BINFO->info_uf2
#define USB_HANDOVER 0

#define BOOT_RTC_SIGNATURE 0x71a21877
#define APP_RTC_SIGNATURE 0x24a22d12
#define HF2_RTC_SIGNATURE 0x39a63a78
#define QUICK_BOOT(v)                                                                                                            \
    do {                                                                                                                         \
        RTC->BKP0R = v ? APP_RTC_SIGNATURE : HF2_RTC_SIGNATURE;                                                                  \
    } while (0)
#else
#define QUICK_BOOT(v) ((void)0)
#endif

#define PAGE_SIZE 1024 // not really

#define DEV_NUM_PINS 64

#ifdef STM32F1
#define DEV_PWM_PINS 0b111100000011101100001110111000111111001110LL
#else
#define DEV_PWM_PINS 0b111100000011100111111110111000111111101111LL
#endif

//               CCCCCCCCCCCCCCCCBBBBBBBBBBBBBBBBAAAAAAAAAAAAAAAA
//               fedcba9876543210fedcba9876543210fedcba9876543210
#define DEV_AIN_PINS 0b000011111100000000000000110000000011111111LL

// Codal doesn't yet distinguish between PWM and AIN
#define DEV_ANALOG_PINS (DEV_PWM_PINS | DEV_AIN_PINS)

#define CODAL_SERIAL codal::STM32Serial
#define CODAL_PIN codal::STM32Pin
#define CODAL_TIMER Timer
#define CODAL_SPI codal::STM32SPI
#define CODAL_I2C codal::STM32I2C
#define CODAL_JACDAC_WIRE_SERIAL codal::ZSingleWireSerial

#define PERF_NOW() (TIM5->CNT)

#define IMAGE_BITS 4

#define ALT0 0x000
#define ALT1 0x100
#define ALT2 0x200

// The parameters below needs tuning!

#ifdef JUST_FOR_DAL_D_TS_CPP_WILL_IGNORE

#define PA_0 0x00
#define PA_0_ALT0 PA_0 | ALT0
#define PA_1 0x01
#define PA_1_ALT0 PA_1 | ALT0
#define PA_2 0x02
#define PA_2_ALT0 PA_2 | ALT0
#define PA_3 0x03
#define PA_3_ALT0 PA_3 | ALT0
#define PA_4 0x04
#define PA_4_ALT0 PA_4 | ALT0
#define PA_5 0x05
#define PA_5_ALT0 PA_5 | ALT0
#define PA_6 0x06
#define PA_6_ALT0 PA_6 | ALT0
#define PA_7 0x07
#define PA_7_ALT0 PA_7 | ALT0
#define PA_7_ALT1 PA_7 | ALT1
#define PA_7_ALT2 PA_7 | ALT2
#define PA_8 0x08
#define PA_9 0x09
#define PA_10 0x0A
#define PA_11 0x0B
#define PA_12 0x0C
#define PA_13 0x0D
#define PA_14 0x0E
#define PA_15 0x0F
#define PA_15_ALT0 PA_15 | ALT0
#define PB_0 0x10
#define PB_0_ALT0 PB_0 | ALT0
#define PB_0_ALT1 PB_0 | ALT1
#define PB_1 0x11
#define PB_1_ALT0 PB_1 | ALT0
#define PB_1_ALT1 PB_1 | ALT1
#define PB_2 0x12
#define PB_3 0x13
#define PB_3_ALT0 PB_3 | ALT0
#define PB_4 0x14
#define PB_4_ALT0 PB_4 | ALT0
#define PB_5 0x15
#define PB_5_ALT0 PB_5 | ALT0
#define PB_6 0x16
#define PB_6_ALT0 PB_6 | ALT0
#define PB_7 0x17
#define PB_7_ALT0 PB_7 | ALT0
#define PB_8 0x18
#define PB_8_ALT0 PB_8 | ALT0
#define PB_9 0x19
#define PB_9_ALT0 PB_9 | ALT0
#define PB_10 0x1A
#define PB_11 0x1B
#define PB_12 0x1C
#define PB_13 0x1D
#define PB_13_ALT0 PB_13 | ALT0
#define PB_14 0x1E
#define PB_14_ALT0 PB_14 | ALT0
#define PB_14_ALT1 PB_14 | ALT1
#define PB_15 0x1F
#define PB_15_ALT0 PB_15 | ALT0
#define PB_15_ALT1 PB_15 | ALT1
#define PC_0 0x20
#define PC_0_ALT0 PC_0 | ALT0
#define PC_0_ALT1 PC_0 | ALT1
#define PC_1 0x21
#define PC_1_ALT0 PC_1 | ALT0
#define PC_1_ALT1 PC_1 | ALT1
#define PC_2 0x22
#define PC_2_ALT0 PC_2 | ALT0
#define PC_2_ALT1 PC_2 | ALT1
#define PC_3 0x23
#define PC_3_ALT0 PC_3 | ALT0
#define PC_3_ALT1 PC_3 | ALT1
#define PC_4 0x24
#define PC_4_ALT0 PC_4 | ALT0
#define PC_5 0x25
#define PC_5_ALT0 PC_5 | ALT0
#define PC_6 0x26
#define PC_6_ALT0 PC_6 | ALT0
#define PC_7 0x27
#define PC_7_ALT0 PC_7 | ALT0
#define PC_8 0x28
#define PC_8_ALT0 PC_8 | ALT0
#define PC_9 0x29
#define PC_9_ALT0 PC_9 | ALT0
#define PC_10 0x2A
#define PC_10_ALT0 PC_10 | ALT0
#define PC_11 0x2B
#define PC_11_ALT0 PC_11 | ALT0
#define PC_12 0x2C
#define PC_13 0x2D
#define PC_14 0x2E
#define PC_15 0x2F
#define PD_0 0x30
#define PD_1 0x31
#define PD_2 0x32
#define PD_3 0x33
#define PD_4 0x34
#define PD_5 0x35
#define PD_6 0x36
#define PD_7 0x37
#define PD_8 0x38
#define PD_9 0x39
#define PD_10 0x3A
#define PD_11 0x3B
#define PD_12 0x3C
#define PD_13 0x3D
#define PD_14 0x3E
#define PD_15 0x3F
#define PE_0 0x40
#define PE_1 0x41
#define PE_2 0x42
#define PE_3 0x43
#define PE_4 0x44
#define PE_5 0x45
#define PE_6 0x46
#define PE_7 0x47
#define PE_8 0x48
#define PE_9 0x49
#define PE_10 0x4A
#define PE_11 0x4B
#define PE_12 0x4C
#define PE_13 0x4D
#define PE_14 0x4E
#define PE_15 0x4F

#endif

#endif
