import { fightActionMgr } from "./fight/action/FightActionMgr";
import { Singleton } from "./fight/components/Singleton";
import { FightConstant } from "./fight/define/FightConstant";
import { FightEvent } from "./fight/event/FightEvent";
import { fightEventMgr } from "./fight/event/FightEventMgr";

export let fightController:FightController = null;

export class FightController extends Singleton{
    
    /**
     * init
     */
    public static init() {
        fightController = FightController.getInstance<FightController>();
        fightController._init();
    }

    private _init(){
        this._initListeners();
    }

    private _initListeners() {
        // 改为监听服务器协议(由服务器数据驱动,demo中，由ui中按钮触发)
        fightEventMgr.addEventListener(FightConstant.macro.FightEvent.Game_Broadcast,this._onBroadcastFightCmd.bind(this));
        fightEventMgr.addEventListener(FightConstant.macro.FightEvent.Game_Pause,this.pause.bind(this));
        fightEventMgr.addEventListener(FightConstant.macro.FightEvent.Game_Replay,this.replay.bind(this));
        fightEventMgr.addEventListener(FightConstant.macro.FightEvent.Game_Resume,this.resume.bind(this));
        fightEventMgr.addEventListener(FightConstant.macro.FightEvent.Game_End,this.skip.bind(this));
        fightEventMgr.addEventListener(FightConstant.macro.FightEvent.Game_Star,this.start.bind(this));
    }

    private _onBroadcastFightCmd(event:FightEvent) {
        let fightData:FightConstant.interfaces.FightCmdData = event.getEventData();
        this._dispatchFightCommand(fightData);
    }

    private _dispatchFightCommand(fightData:FightConstant.interfaces.FightCmdData) {
        fightActionMgr.dispatchAction(fightData);
    }

    private start(event:FightEvent) {
        
    }

    /**
     * pause
     */
    private pause(event:FightEvent) {
        
    }

    /**
     * resume
     */
     private resume(event:FightEvent) {
        
    }

    /**
     * restart
     */
     private replay(event:FightEvent) {
        
    }

    /**
     * skip
     */
     private skip(event:FightEvent) {
        
    }

    public destory(){
        FightController.destoryInstance();
    }

    public clear(){
        fightController = null;
    }
}