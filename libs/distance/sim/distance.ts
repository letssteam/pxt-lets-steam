namespace pxsim {
    export enum DistanceCondition {
        //% block="far"
        Far = 2,  // SENSOR_THRESHOLD_HIGH
        //% block="near"
        Near = 1,  // SENSOR_THRESHOLD_LOW
    }
    
    export const enum DistanceUnit {
        //% block="mm"
        Millimeter = 0,
        //% block="cm"
        Centimeter = 1,
        //% block="dm"
        Decimeter = 2,
        //% block="m"
        Meter = 3,
    }
}
namespace pxsim.input {

    export function onDistanceConditionChanged(condition: number, distance: number, unit: DistanceUnit, body: RefAction): void{
        let b = distanceState();
        b.setUsed();

        let d = distance;

        switch (unit)
        {
            case DistanceUnit.Millimeter:
                d = distance;
                break;
            case DistanceUnit.Centimeter:
                d = distance * 10;
                break;
            case DistanceUnit.Decimeter:
                d = distance * 100;
                break;
            case DistanceUnit.Meter:
                d = distance * 1000;
                break;
            default:
                d = 0;
                break;
        }
        
        if (condition === DAL.ANALOG_THRESHOLD_HIGH) {
            b.setHighThreshold(d);
        }
        else {
            b.setLowThreshold(d);
        }
        pxtcore.registerWithDal(b.id, condition, body);
    }


    export function distance(unit: DistanceUnit): number{
        let b = distanceState();
        b.setUsed();
        const distance = b.getLevel();
        setDistanceUnit(unit);
        switch (unit)
        {
            case DistanceUnit.Millimeter:
                return distance;
            case DistanceUnit.Centimeter:
                return distance / 10.;
            case DistanceUnit.Decimeter:
                return distance / 100.;
            case DistanceUnit.Meter:
                return distance / 1000.;
            default:
                return 0;
        }
    }
}