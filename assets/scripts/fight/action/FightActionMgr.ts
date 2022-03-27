import { Singleton } from "../components/Singleton";
import { FightConstant } from "../define/FightConstant";

export let fightActionMgr:FightActionMgr = null;

export class FightActionMgr extends Singleton{
    
    /**
     * init
     */
    public static init() {
        fightActionMgr = FightActionMgr.getInstance<FightActionMgr>();
        fightActionMgr._init();
    }

    private _init(){
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
        let cmd = fightData.Command;
        let data = fightData.data;
        switch (cmd) {
            case FightConstant.macro.FightConmand.Attack:
                
                break;
            case FightConstant.macro.FightConmand.Die:

                break;
            case FightConstant.macro.FightConmand.Hit:

                break;
            case FightConstant.macro.FightConmand.Idle:

                break;
            case FightConstant.macro.FightConmand.Move:

                break;
            case FightConstant.macro.FightConmand.Skill:

                break;
        }
    }

    public destory(){
        FightActionMgr.destoryInstance();
    }

    public clear(){
        fightActionMgr = null;
    }
}