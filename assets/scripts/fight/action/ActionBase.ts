import { FightMainWorld } from "../../FightMainWorld";

export class ActionBase {

    static _fightMainWorld:FightMainWorld = null;

    static init(mainWorld:FightMainWorld){
        ActionBase._fightMainWorld = mainWorld;
    }
    
    static start(...args:any){

    };

    static done(){

    };
}