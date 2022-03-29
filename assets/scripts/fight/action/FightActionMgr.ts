import { log } from "cc";
import { FightMainView } from "../../FightMainView";
import { FightMainWorld } from "../../FightMainWorld";
import { Singleton } from "../components/Singleton";
import { FightConstant } from "../define/FightConstant";
import { ActionBase } from "./ActionBase";
import { ActionCreate } from "./ActionCreate";
import { ActionSkill } from "./ActionSkill";
import { ActionSpineAnimation } from "./ActionSpineAnimation";

export let fightActionMgr:FightActionMgr = null;

export class FightActionMgr extends Singleton{
    
    private _mainView:FightMainView = null;
    private _mainWorld:FightMainWorld = null
    
    private _isDispatching:boolean = false;

    private _messageQueue:Array<FightConstant.interfaces.FightCmdData> = null;
    private _tempMessageQueue:Array<FightConstant.interfaces.FightCmdData> = null;
    /**
     * init
     */
    public static init(mainWorld:FightMainView) {
        fightActionMgr = FightActionMgr.getInstance<FightActionMgr>();
        fightActionMgr._init(mainWorld);
    }

    private _init(mainWorld:FightMainView){
        this._mainView = mainWorld;
        this._mainWorld = this._mainView.getFightMainWorld();
        this._isDispatching = false;
        this._tempMessageQueue = new Array();
        this._messageQueue = new Array();
        ActionBase.init(this._mainWorld);
        this._initListeners();
    }

    private _initListeners() {
        // 改为监听服务器协议
        // fightEventMgr.addEventListener(FightConstant.macro.FightEvent.Game_Broadcast,this._onBroadcastFightCmd.bind(this));
    }

    /**
     * 
     */
    public dispatchAction(fightData:FightConstant.interfaces.FightCmdData) {
        if (!this._mainWorld){
            this._mainWorld = this._mainView.getFightMainWorld();
            ActionBase.init(this._mainWorld);
        }

        if (this._isDispatching){
            return this._tempMessageQueue.push(fightData);
        }

        this._isDispatching = true;

        if (this._tempMessageQueue.length > 0) {
            this._messageQueue.push(...this._tempMessageQueue);
            this._tempMessageQueue.length = 0;
        }

        this._messageQueue.push(fightData);

        while (this._messageQueue.length > 0) {
            let message = this._messageQueue.shift();
            if (message){
                this._dispatch(message);
            }
        }
    }

    private _dispatch(fightData:FightConstant.interfaces.FightCmdData) {
        let cmd = fightData.Command;
        let data = fightData.data;
        switch (cmd) {
            case FightConstant.macro.FightConmand.Create:
                ActionCreate.start(data);
                break;
            case FightConstant.macro.FightConmand.Attack:
                ActionSpineAnimation.start(data);
                break;
            case FightConstant.macro.FightConmand.Die:

                break;
            case FightConstant.macro.FightConmand.Hit:
                ActionSpineAnimation.start(data);
                break;
            case FightConstant.macro.FightConmand.Idle:
                ActionSpineAnimation.start(data);
                break;
            case FightConstant.macro.FightConmand.Move:

                break;
            case FightConstant.macro.FightConmand.Skill:
                ActionSkill.start(data);
                break;
        }
        this._isDispatching = false;
    }

    /**
     * getFightMainWorld
     */
    public getFightMainWorld():FightMainWorld{
        return this._mainWorld;
    }

    public destory(){
        FightActionMgr.destoryInstance();
    }

    public clear(){
        fightActionMgr = null;
    }
}