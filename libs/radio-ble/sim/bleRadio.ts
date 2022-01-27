
namespace pxsim.magnetics{

    export function setLocalName(name: string): void{}
    export function setAdvertisingUserStringData(data: string): void{}
    export function setAdvertisingKeyValueData(key: string, value: number): void{}
    export function availableDataFromName(name: string): boolean{return false;}
    export function readDataFromName(name: string): string{return "";}
    export function onTemperatureConditionChanged(Name: string, handler: () => void): void{}
    export function isEmitting(): boolean{return false;}
    export function isScanning(): boolean{return false;}
    export function setAdvertisingService(uuidService: number, data: string): void{}
    export function setAdvertisingData(id: number, data: string): void{}
    export function stopScanning(): void{}
    export function stopEmitting(): void{}
    export function starScanning(ms?: number): void {}
    export function startEmitting(ms?: number): void {}
    export function onNewMessageReceived(name: string, handler: () => void): void{}
}