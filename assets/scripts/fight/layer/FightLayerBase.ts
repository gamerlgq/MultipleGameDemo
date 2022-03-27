import { Component, UITransform } from "cc";
import { FightMainWorld } from "../../FightMainWrold";


export class FightLayerBase extends Component {

    _mainWorld:FightMainWorld = null

    onLoad(){
        this._mainWorld = this.node.parent as FightMainWorld;;
    }

    public startGame(){
        
    }

    public updateView(data:any) {
        
    }
}