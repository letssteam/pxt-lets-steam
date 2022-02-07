namespace test {

    let _device: TestCodal;
    export function getTest(): TestCodal {
        if (!_device) {
            const pin = pins.pinByCfg(DAL.CFG_PIN_LED);
            _device = test.getObject(pin);
        }
        return _device;
    }

}
