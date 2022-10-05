namespace config {
       
    // ====================================================
    // ===  UART  =======================================
    // ================================================
    export const PIN_UART1_TX = DAL.PB_6;
    export const PIN_UART1_RX = DAL.PB_7;
    
    export const PIN_UART2_TX = DAL.PD_5;
    export const PIN_UART2_RX = DAL.PD_6;
    
    export const PIN_UART3_TX = DAL.PD_8;
    export const PIN_UART3_RX = DAL.PD_9;
    
    export const PIN_UART4_TX = DAL.PA_0;
    export const PIN_UART4_RX = DAL.PA_1;
    

    // ====================================================
    // ===  SPI  ========================================
    // ================================================
    export const PIN_SPI1_MISO = DAL.PA_6;
    export const PIN_SPI1_MOSI = DAL.PA_7_ALT1;
    export const PIN_SPI1_SCK = DAL.PA_5;
    
    export const PIN_SPI2_MISO = DAL.PD_3;
    export const PIN_SPI2_MOSI = DAL.PD_4;
    export const PIN_SPI2_SCK = DAL.PD_1;
    
    export const PIN_SPI3_MISO = DAL.PC_11;
    export const PIN_SPI3_MOSI = DAL.PC_12;
    export const PIN_SPI3_SCK = DAL.PC_10;


    // ====================================================
    // ===  I2C  ========================================
    // ================================================
    export const PIN_I2C1_SCL = DAL.PB_8;
    export const PIN_I2C1_SDA = DAL.PB_9;
    
    export const PIN_I2C2_SCL = DAL.PB_10;
    export const PIN_I2C2_SDA = DAL.PB_11;

    
    // ====================================================
    // ===  PERIPHERALS  ================================
    // ================================================
    export const PIN_ACCELEROMETER_SDA = PIN_I2C2_SDA;
    export const PIN_ACCELEROMETER_SCL = PIN_I2C2_SCL;
    export const PIN_ACCELEROMETER_INT = DAL.PD_11; 

    export const PIN_HTS221_SDA = PIN_I2C2_SDA;
    export const PIN_HTS221_SCL = PIN_I2C2_SCL;

    export const PIN_LPS22HB_SDA = PIN_I2C2_SDA;
    export const PIN_LPS22HB_SCL = PIN_I2C2_SCL;

    export const PIN_VL53L0X_SDA = PIN_I2C2_SDA;
    export const PIN_VL53L0X_SCL = PIN_I2C2_SCL;
    export const PIN_VL53L0X_SHUT = DAL.PC_6;

    export const PIN_LSM6DSL_SDA = PIN_I2C2_SDA;
    export const PIN_LSM6DSL_SCL = PIN_I2C2_SCL;

    export const PIN_BLE_SPI_MOSI = PIN_SPI3_MOSI;
    export const PIN_BLE_SPI_MISO = PIN_SPI3_MISO;
    export const PIN_BLE_SPI_SCLK = PIN_SPI3_SCK;

    export const PIN_BLE_SPI_CS = DAL.PD_13;
    export const PIN_BLE_SPI_IRQ = DAL.PE_6;
    export const PIN_BLE_RST = DAL.PA_8;

    export const PIN_WIFI_ISM43362_MOSI = PIN_SPI3_MOSI;
    export const PIN_WIFI_ISM43362_MISO = PIN_SPI3_MISO;
    export const PIN_WIFI_ISM43362_SCK = PIN_SPI3_SCK;
    
    export const PIN_WIFI_ISM43362_CS = DAL.PE_0;
    export const PIN_WIFI_ISM43362_COMMAND_DATA_READY = DAL.PE_1;
    export const PIN_WIFI_ISM43362_RESET = DAL.PE_8;
    export const PIN_WIFI_ISM43362_WAKE_UP = DAL.PB_13;
    

    // ====================================================
    // ===  ARDUINO  ====================================
    // ================================================
    export const PIN_A0 = DAL.PC_5;
    export const PIN_A1 = DAL.PC_4;
    export const PIN_A2 = DAL.PC_3;
    export const PIN_A3 = DAL.PC_2;
    export const PIN_A4 = DAL.PC_1;
    export const PIN_A5 = DAL.PC_0;

    export const PIN_D0 = DAL.PA_1;
    export const PIN_D1 = DAL.PA_0;
    export const PIN_D2 = DAL.PD_14;
    export const PIN_D3 = DAL.PB_0_ALT1;
    export const PIN_D4 = DAL.PA_3;
    export const PIN_D5 = DAL.PB_4;
    export const PIN_D6 = DAL.PB_1_ALT1;
    export const PIN_D7 = DAL.PA_4;
    export const PIN_D8 = DAL.PB_2;
    export const PIN_D9 = DAL.PA_15;
    export const PIN_D10 = DAL.PA_2;
    export const PIN_D11 = DAL.PA_7_ALT1;
    export const PIN_D12 = DAL.PA_6;
    export const PIN_D13 = DAL.PA_5;
    export const PIN_D14 = DAL.PB_9;
    export const PIN_D15 = DAL.PB_8;

    export const PIN_RX = PIN_UART1_RX;
    export const PIN_TX = PIN_UART1_TX;

    export const PIN_MISO = PIN_SPI1_MISO;
    export const PIN_MOSI = PIN_SPI1_MOSI;
    export const PIN_SCK = PIN_SPI1_SCK;

    export const PIN_SCL = PIN_I2C1_SCL;
    export const PIN_SDA = PIN_I2C1_SDA;


    // ====================================================
    // ===  ON-BOARD COMPONENTS  ========================
    // ================================================
    export const PIN_LED = DAL.PA_5;
    export const PIN_LED2 = DAL.PB_14;
    export const PIN_LED3 = DAL.PC_9;

    export const PIN_BTN_USER = DAL.PC_13;
    export const PIN_RESET = DAL.NO_CONN;
    export const PIN_TEMPERATURE = DAL.NO_CONN;


    // ====================================================
    // ===  EXTERNAL DEFINITION  ========================
    // ================================================
    export const PIN_SPEAKER_AMP = PIN_D3;
}
