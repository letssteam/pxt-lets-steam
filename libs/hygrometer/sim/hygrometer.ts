namespace pxsim.input {

    export function humidity(): number {
        let state = hygrometerState();
        state.setUsed();
        return state.getLevel() ;
    }

    export function onHumidityConditionChanged(condition: number, humidity: number, body: RefAction) {
        let state = hygrometerState();
        state.setUsed();
        
        if (condition === DAL.ANALOG_THRESHOLD_HIGH) {
            state.setHighThreshold(humidity);
        }
        else {
            state.setLowThreshold(humidity);
        }
        pxtcore.registerWithDal(state.id, condition, body);
    }
}