/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>

namespace pxsim {

    export class JoystickState {
        private deadzone : number = 0;
        private horizontalAxis : number = 0;
        private verticalAxis : number = 0;
        private isButtonPressed : boolean;
        public axisEvents : RefAction[];
        public buttonEvents : RefAction[];
        public lastAxisEvent : number[];
        
        constructor() {
            this.deadzone = 10;
            this.isButtonPressed = false;
            this.axisEvents = [null, null, null, null];
            this.buttonEvents = [null, null, null, null, null];
            this.lastAxisEvent = [];
        }

        public registerAxisEvent(direction : number, handler : RefAction) {
            this.axisEvents[direction] = handler; 
        }

        public registerButtonEvent(eventType : number, handler : RefAction) {
            this.buttonEvents[eventType] = handler;
        }
        public setJoystickButtonState(newState : boolean) {
            this.isButtonPressed = newState;
        }
        public getJoystickButtonState() {
            return this.isButtonPressed;
        }
        public getDeadzone() {
            return this.deadzone;
        }

        public setDeadzone(newDeadzone: number) {
            if (newDeadzone > 100)
                this.deadzone = 100
            else if (newDeadzone < 0)
                this.deadzone = 0
            else
                this.deadzone = newDeadzone
        }

        public getAxis(axis : number) : number {
            if (axis == 0) 
                return this.horizontalAxis;
            else if (axis == 1)
                return this.verticalAxis;
            else
                return 0;
        }
        public setAxis(axis : number, newAxisVal : number) : void {
            if (axis == 0) {
                if(Math.abs(newAxisVal) <= this.deadzone)
                    this.horizontalAxis = 0;
                else 
                    this.horizontalAxis = newAxisVal;
            }
            else if (axis == 1) {
                if(Math.abs(newAxisVal) <= this.deadzone)
                    this.verticalAxis = 0;
                else 
                    this.verticalAxis = newAxisVal;
            }
        }
    }

    export function joystickState(): JoystickState {
        return (board() as JoystickBoard).joystickState;
    }
}