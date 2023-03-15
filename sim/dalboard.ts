/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../built/common-sim.d.ts"/>

namespace pxsim {
    export let pinIds: Map<number>;

    export function pinByName(name: string) {
        let v = pinIds[name]
        if (v == null) {
            v = getConfig(getConfigKey("PIN_" + name))
        }
        let p = pxtcore.getPin(v)
        if (!p)
            console.error("missing pin: " + name + "(" + v + ")")
        return p
    }

    export class DalBoard extends CoreBoard
        implements MusicBoard,
        LightBoard,
        CapTouchBoard,
        AccelerometerBoard,
        StorageBoard,
        LightSensorBoard,
        TemperatureBoard,
        MicrophoneBoard,
        ScreenBoard,
        InfraredBoard,
        LCDBoard,
        RadioBoard,
        ControlMessageBoard,
        
        DistanceBoard,
        HygrometerBoard,
        BarometerBoard,
        CompassBoard,
        SSD1306Board,
        SerialBoard,
        hcsr04Board,
        JoystickBoard,
        LCDI2CBoard,
        MHZ19BBoard,
        SoilHygrometerBoard
        {
        // state & update logic for component services
        viewHost: visuals.BoardHost;
        view: SVGElement;
        edgeConnectorState: EdgeConnectorState;
        lightSensorState: AnalogSensorState;
        buttonState: CommonButtonState;
        lightState: pxt.Map<CommonNeoPixelState>;
        audioState: AudioState;
        neopixelPin: Pin;
        touchButtonState: TouchButtonState;
        accelerometerState: AccelerometerState;
        storageState: StorageState;
        thermometerState: AnalogSensorState;
        thermometerUnitState: TemperatureUnit;
        microphoneState: AnalogSensorState;
        screenState: ScreenState;
        irState: InfraredState;
        lcdState: LCDState;
        radioState: RadioState;
        controlMessageState: ControlMessageState;

        distanceState: AnalogSensorState;
        distanceUnitState: DistanceUnit;
        hygrometerState: AnalogSensorState;
        barometerState: AnalogSensorState;
        pressureUnitState: PressureUnit;
        compassState: CompassState;
        ssd1306State: SSD1306State;
        lcdI2CState: LCDState;
        soilHygrometerState: SoilHygrometerState;

        hcsr04State: HCSR04State;
        mhz19bState: MHZ19BState;

        serialState: STMSerialState;
        joystickState: JoystickState;

        constructor(public boardDefinition: BoardDefinition) {
            super();

            const pinList: number[] = []
            const servos: Map<number> = {}

            function pinId(name: string) {
                let key = getConfigKey("PIN_" + name)
                if (key != null)
                    return getConfig(key)
                // this is for P03 format used by NRF - these are direct names of CPU pins
                let m = /^P(\d+)$/.exec(name)
                if (m)
                    return parseInt(m[1])
                return null
            }

            pinIds = {}

            for (let block of (boardDefinition.visual as BoardImageDefinition).pinBlocks) {
                // scan labels
                for (let lbl of block.labels) {
                    for (let sublbl of lbl.split(/[\/,]/)) {
                        sublbl = sublbl.replace(/[~\s]+/g, "")
                        let id = pinId(sublbl)

                        if (id != null) {
                            if (pinList.indexOf(id) < 0) {
                                pinList.push(id)
                                servos[sublbl] = id;
                            }
                            pinIds[lbl] = id;
                            pinIds[sublbl] = id;
                        }
                    }
                }
            }

            // also add pins that might not have visual representation
            for (let k of getAllConfigKeys()) {
                if (/^PIN_/.test(k)) {
                    let id = getConfig(getConfigKey(k))
                    if (id != null) {
                        if (pinList.indexOf(id) < 0)
                            pinList.push(id);
                        pinIds[k.replace(/^PIN_/, "")] = id;
                    }
                }
            }

            this.lightState = {};
            this.microphoneState = new AnalogSensorState(DAL.DEVICE_ID_MICROPHONE, 52, 120, 75, 96);
            this.storageState = new StorageState();
            this.lightSensorState = new AnalogSensorState(DAL.DEVICE_ID_LIGHT_SENSOR, 0, 255, 128 / 4, 896 / 4);
            this.thermometerState = new AnalogSensorState(DAL.DEVICE_ID_THERMOMETER, -20, 50, 10, 30);
            this.thermometerUnitState = TemperatureUnit.Celsius;
            this.irState = new InfraredState(this);
            this.lcdState = new LCDState();
            this.controlMessageState = new ControlMessageState(this);
            this.bus.setNotify(DAL.DEVICE_ID_NOTIFY, DAL.DEVICE_ID_NOTIFY_ONE);



            this.distanceState = new AnalogSensorState(DAL.DEVICE_ID_DISTANCE, 0, 2000);
            this.distanceUnitState = DistanceUnit.Millimeter;
            this.hygrometerState = new AnalogSensorState(DAL.DEVICE_ID_HUMIDITY, 0, 100);
            this.barometerState = new AnalogSensorState(DAL.DEVICE_ID_PRESSURE, 980, 1050);
            this.pressureUnitState = PressureUnit.HectoPascal;
            this.ssd1306State = new SSD1306State();
            this.serialState = new STMSerialState(runtime, this);
            this.joystickState = new JoystickState();
            this.lcdI2CState = new LCDState();

            this.hcsr04State = new HCSR04State();
            this.mhz19bState = new MHZ19BState();

            this.soilHygrometerState = new SoilHygrometerState()


            // TODO we need this.buttonState set for pxtcore.getButtonByPin(), but
            // this should be probably merged with buttonpair somehow
            this.builtinParts["radio"] = this.radioState = new RadioState(runtime, this, {
                ID_RADIO: DAL.DEVICE_ID_RADIO,
                RADIO_EVT_DATAGRAM: 1 /*DAL.DEVICE_RADIO_EVT_DATAGRAM*/
            });
            this.builtinParts["pinbuttons"] = this.builtinParts["buttons"]
                = this.buttonState = new CommonButtonState();
            this.builtinParts["touch"] = this.touchButtonState = new TouchButtonState(pinList);

            // components
            this.builtinParts["audio"] = this.audioState = new AudioState();
            this.builtinParts["edgeconnector"] = this.edgeConnectorState = new EdgeConnectorState({
                pins: pinList,
                servos
            });
            this.builtinParts["microservo"] = this.edgeConnectorState;
            this.builtinParts["accelerometer"] = this.accelerometerState = new AccelerometerState(runtime);;
            this.builtinParts["screen"] = this.screenState = new ScreenState([], getConfig(DAL.CFG_DISPLAY_WIDTH) || 160, getConfig(DAL.CFG_DISPLAY_HEIGHT) || 128);

            this.builtinVisuals["buttons"] = () => new visuals.ButtonView();
            this.builtinVisuals["microservo"] = () => new visuals.MicroServoView();

            this.builtinParts["neopixel"] = (pin: Pin) => { return this.neopixelState(pin.id); };
            this.builtinVisuals["neopixel"] = () => new visuals.NeoPixelView(parsePinString);
            this.builtinPartVisuals["neopixel"] = (xy: visuals.Coord) => visuals.mkNeoPixelPart(xy);

            this.builtinParts["dotstar"] = (pin: Pin) => { return this.neopixelState(pin.id); };
            this.builtinVisuals["dotstar"] = () => new visuals.NeoPixelView(parsePinString);
            this.builtinPartVisuals["dotstar"] = (xy: visuals.Coord) => visuals.mkNeoPixelPart(xy);

            this.builtinParts["lcd"] =  this.lcdState;
            this.builtinVisuals["lcd"] = () => new visuals.LCD2View();
            this.builtinPartVisuals["lcd"] = (xy: visuals.Coord) => visuals.mkLCD2Part(xy);

            this.builtinPartVisuals["buttons"] = (xy: visuals.Coord) => visuals.mkBtnSvg(xy);

            this.builtinPartVisuals["microservo"] = (xy: visuals.Coord) => visuals.mkMicroServoPart(xy);

            this.builtinParts["slideswitch"] = (pin: Pin) => new ToggleState(pin);
            this.builtinVisuals["slideswitch"] = () => new visuals.ToggleComponentVisual(parsePinString);
            this.builtinPartVisuals["slideswitch"] = (xy: visuals.Coord) => visuals.mkSideSwitchPart(xy);

            this.builtinParts["led"] = (pin: Pin) => new ToggleState(pin);
            this.builtinVisuals["led"] = () => new visuals.LedView(parsePinString);
            this.builtinPartVisuals["led"] = (xy: visuals.Coord) => visuals.mkLedPart(xy);

            this.builtinVisuals["photocell"] = () => new visuals.PhotoCellView(parsePinString);
            this.builtinPartVisuals["photocell"] = (xy: visuals.Coord) => visuals.mkPhotoCellPart(xy);

            this.builtinVisuals["screen"] = () => new visuals.ScreenView();
            this.builtinPartVisuals["screen"] = (xy: visuals.Coord) => visuals.mkScreenPart(xy);

            
            this.neopixelPin = this.edgeConnectorState.getPin(getConfig(DAL.CFG_PIN_ONBOARD_DOTSTAR_DATA)) 
            || this.edgeConnectorState.getPin(getConfig(DAL.CFG_PIN_ONBOARD_NEOPIXEL))
            || this.edgeConnectorState.getPin(getConfig(DAL.CFG_PIN_DOTSTAR_DATA)) 
            || this.edgeConnectorState.getPin(getConfig(DAL.CFG_PIN_NEOPIXEL));
            
            this.builtinParts["pixels"] = (pin: Pin) => { return this.neopixelState(!!this.neopixelPin && this.neopixelPin.id); };
            this.builtinVisuals["pixels"] = () => new visuals.NeoPixelView(parsePinString);
            this.builtinPartVisuals["pixels"] = (xy: visuals.Coord) => visuals.mkNeoPixelPart(xy);




            this.builtinParts["distance"] = () => new DistanceState(this.distanceState, this.distanceUnitState);
            this.builtinVisuals["distance"] = () => new visuals.DistanceView();

            this.builtinParts["hygrometer"] = () => new HygrometerState( this.hygrometerState );
            this.builtinVisuals["hygrometer"] = () => new visuals.HygrometerView();

            this.builtinParts["thermometer"] = () => new ThermometerState( this.hygrometerState );
            this.builtinVisuals["thermometer"] = () => new visuals.ThermometerView();

            this.builtinParts["barometer"] = () => new BarometerState( this.hygrometerState, this.pressureUnitState );
            this.builtinVisuals["barometer"] = () => new visuals.BarometerView();

            this.builtinParts["compass"] = this.compassState = new CompassState();

            this.builtinParts["ssd1306"] = this.ssd1306State;
            this.builtinVisuals["ssd1306"] = () => new visuals.SSD1306View();
            this.builtinPartVisuals["ssd1306"] = (xy: visuals.Coord) => visuals.mkSSD1306Part(xy);

            this.builtinParts["serial"] = this.serialState;


            this.builtinParts["hcsr04"] = this.hcsr04State;
            this.builtinVisuals["hcsr04"] = () => new visuals.HCSR04View();
            this.builtinPartVisuals["hcsr04"] = (xy: visuals.Coord) => visuals.mkHCSR04(xy);


            
            this.builtinParts["joystick"] = this.joystickState;
            this.builtinVisuals["joystick"] = () => new visuals.JoystickView();
            this.builtinPartVisuals["joystick"] = (xy: visuals.Coord) => visuals.mkJoystickPart(xy);

            this.builtinParts["lcd_i2c"] =  this.lcdI2CState;
            this.builtinVisuals["lcd_i2c"] = () => new visuals.LCDI2C2View();
            this.builtinPartVisuals["lcd_i2c"] = (xy: visuals.Coord) => visuals.mkLCDI2C2Part(xy);

            this.builtinParts["soil_hygrometer"] = this.soilHygrometerState;
            this.builtinVisuals["soil_hygrometer"] = () => new visuals.SoilHygrometerView();
            this.builtinPartVisuals["soil_hygrometer"] = (xy: visuals.Coord) => visuals.mkSoilHygrometerPart(xy);
            
            this.builtinParts["mh_z19b"] =  this.mhz19bState;
            this.builtinVisuals["mh_z19b"] = () => new visuals.MHZ19BView();
            this.builtinPartVisuals["mh_z19b"] = (xy: visuals.Coord) => visuals.mkMHZ19B(xy);
        }

        kill() {
            super.kill();
            AudioContextManager.stop();
        }

        initAsync(msg: SimulatorRunMessage): Promise<void> {
            super.initAsync(msg);

            const options = (msg.options || {}) as pxt.RuntimeOptions;

            const boardDef = msg.boardDefinition;
            const cmpsList = msg.parts;
            cmpsList.sort();
            const cmpDefs = msg.partDefinitions || {};
            const fnArgs = msg.fnArgs;

            const opts: visuals.BoardHostOpts = {
                state: this,
                boardDef: boardDef,
                partsList: cmpsList,
                partDefs: cmpDefs,
                fnArgs: fnArgs,
                maxWidth: "100%",
                maxHeight: "100%",
                forceBreadboardLayout: true,
                forceBreadboardRender: true
            };
            this.viewHost = new visuals.BoardHost(pxsim.visuals.mkBoardView({
                visual: boardDef.visual,
                boardDef
            }), opts);

            document.body.innerHTML = ""; // clear children
            document.body.appendChild(this.view = this.viewHost.getView());

            this.accelerometerState.attachEvents(this.view);

            return Promise.resolve();
        }

        screenshotAsync(width?: number): Promise<ImageData> {
            return this.viewHost.screenshotAsync(width);
        }

        accelerometer(): Accelerometer {
            return this.accelerometerState.accelerometer;
        }

        getDefaultPitchPin() {
            // amp always on PA02, regardless which name is has
            return pxtcore.getPin(DAL.PA02);
        }

        tryGetNeopixelState(pinId: number): CommonNeoPixelState {
            return this.lightState[pinId];
        }

        neopixelState(pinId: number): CommonNeoPixelState {
            if (pinId === undefined) {
                pinId = pxtcore.getConfig(DAL.CFG_PIN_MOSI, -1);
            }
            let state = this.lightState[pinId];
            if (!state) state = this.lightState[pinId] = new CommonNeoPixelState();
            return state;
        }
    }

    export function initRuntimeWithDalBoard(msg: SimulatorRunMessage) {
        U.assert(!runtime.board);
        let b = new DalBoard(msg.boardDefinition);
        runtime.board = b;
        runtime.postError = (e) => {
            // TODO
            runtime.updateDisplay();
        }
    }

    if (!pxsim.initCurrentRuntime) {
        pxsim.initCurrentRuntime = initRuntimeWithDalBoard;
    }

    export function parsePinString(pinString: string): Pin {
        const pinName = pinString && pxsim.readPin(pinString);
        return pinName && pxtcore.getPin(pinIds[pinName]);
    }
}
