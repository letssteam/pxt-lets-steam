
namespace pxsim.Joystick {

    export function getJoystickAxis(axis : number) : number {
        let state = joystickState();
        return state.getAxis(axis);
    }

    export function isJoystickButtonPressed() : boolean {
        let state = joystickState();
        return state.getJoystickButtonState();
    }
    export function getJoystickDeadzone() : number {
        let state = joystickState();
        return state.getDeadzone();
    }

    export function setJoystickDeadzone(newDeadzone : number) : void {
        let state = joystickState();
        state.setDeadzone(newDeadzone);
    }

    export function isJoystickPointingTowards(direction : number) : boolean {
        if (direction == 0 && getJoystickAxis(0) < -this.deadzone)
            return true;
        else if (direction == 1 && getJoystickAxis(1) < -this.deadzone)
            return true;
        else if (direction == 2 && getJoystickAxis(0) > this.deadzone)
            return true;
        else if (direction == 3 && getJoystickAxis(1) > this.deadzone)
            return true;
        else
            return false;
    }

    export function onJoystickPointingTo(direction : number, handler : RefAction) : void {
        let state = joystickState();
        state.registerAxisEvent(direction, handler);
    }

    export function onButton(eventType : number , handler : RefAction) : void {
        let state = joystickState();
        state.registerButtonEvent(eventType, handler);
    }
}