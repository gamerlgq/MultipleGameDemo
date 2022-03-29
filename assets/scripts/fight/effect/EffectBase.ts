

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('EffectBase')
export class EffectBase extends Component {

    static getPrefabPath():string{
        return ""
    }
  
    private _endCallback:Function = null;
    private _startCallback:Function = null;

    start(){
        if(this._startCallback){
            this._startCallback();
        }
    }

    /**
     * 
     * @param callback 设置回调
     */
    public setStartCallback(callback:Function) {
        this._startCallback = callback;
    }

    /**
     * 
     * @param callback 设置回调
     */
    public setEndCallback(callback:Function) {
        this._endCallback = callback;
    }

    public onEndTriggered(arg: string) {
        if (this._endCallback){
            this._endCallback();
        }
    }
}