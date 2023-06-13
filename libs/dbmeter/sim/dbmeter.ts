namespace pxsim.input {


export function ondbMeterConditionChanged(condition: number, value: number, body: RefAction) : void {
    let b = dbMeterState();
    b.setUsed();

    if(condition == DAL.ANALOG_THRESHOLD_HIGH){
        b.setHighThreshold(value);
    }
    else{
        b.setLowThreshold(value);
    }

    pxtcore.registerWithDal(b.id, condition, body);
}

export function decibel() : number {
    let b = dbMeterState();
    b.setUsed();

    return b.getLevel();
}
}