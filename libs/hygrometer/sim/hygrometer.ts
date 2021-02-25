namespace pxsim.input {

    export function humidity(): number {
        let b = hygrometerState();
        b.setUsed();
        const humidity = b.getLevel();
        return humidity ;
    }

    export function onHumidityConditionChanged(condition: number, humidity: number, body: RefAction) {
        let b = hygrometerState();
        b.setUsed();

        const t = humidity;
        
        if (condition === DAL.ANALOG_THRESHOLD_HIGH) {
            b.setHighThreshold(t);
        }
        else {
            b.setLowThreshold(t);
        }
        pxtcore.registerWithDal(b.id, condition, body);
    }
}