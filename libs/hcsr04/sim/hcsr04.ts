namespace pxsim.HCSR04 {

    export function getDistance(unit: number): number {
        let state = hcsr04State();
        state.setUsed();
        return state.getDistance(0);
    }

    export function onDistanceFrom(fromDistanceIs : number, distance : number, unit : number, handler : RefAction) : void {
        let state = hcsr04State();
        state.setUsed();
        switch(unit) {
            case 0:
                distance = distance * 1000;
                break;

            case 1:
                distance = distance * 100;
                break;

            case 2:
                distance = distance * 10;
                break;

            case 3: 
            default:
                break;
        }
        state.registerDistanceEvent(fromDistanceIs, distance, handler);
    }
}