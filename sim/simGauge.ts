

type SimGaugeCallback =  (id_sender: string) => void;

class SimGaugeData {
    id: string;
    onAskClose: SimGaugeCallback;
}

namespace pxsim {

    export class SimGaugeMessage {
        private static callbackMap: SimGaugeData[] = [];

        static askClose(id: string){
            for( let e of SimGaugeMessage.callbackMap ){
                if( e.id == id ){ continue; }
                if( e.onAskClose ) { e.onAskClose(id); }
            }
        } 

        static registerOnAskClose( id: string, cb: SimGaugeCallback ){
            let idx = SimGaugeMessage.callbackMap.findIndex( (e) => e.id == id );

            if( idx == -1 ){
                SimGaugeMessage.callbackMap.push( {id: id, onAskClose: cb} ); 
            }
            else{
                SimGaugeMessage.callbackMap[idx].onAskClose = cb;
            }
        }
    }
}