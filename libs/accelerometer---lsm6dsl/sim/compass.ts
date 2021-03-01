namespace pxsim.input {
    export function compassHeading(): number {
        let b = compass();
        if (!b.usesHeading) {
            b.usesHeading = true;
            runtime.queueDisplayUpdate();
        }
        return b.heading;
    }

    export function magneticForce(): number {
        // TODO
        return 0;
    }

    export function gyroscopicForce(dimension: number): number{
        // TODO
        return 0;
    }
}