
import { _decorator, Component, Node, resources, Prefab, Asset, instantiate, log } from 'cc';
import { fightActionMgr, FightActionMgr } from './fight/action/FightActionMgr';
import { FightConstant } from './fight/define/FightConstant';
import { fightEventMgr, FightEventMgr } from './fight/event/FightEventMgr';
import { fightController, FightController } from './FightController';
import { FightMainWorld } from './FightMainWorld';
const { ccclass, property } = _decorator;
 
@ccclass('FightMainView')
export class FightMainView extends Component {
    
    @property(Node)
    content:Node = null;

    private _fightMainWorld:FightMainWorld = null;

    onLoad(){
        this.init();
    }

    /**
    * @description 初始化
    */
    public init() {
        this._initManagers();
        this._initBg();
        this._loadMainWorld();
        this._loadMainUI();
        this._addListeners();
    }

    private _initManagers() {
        // 战报数据管理器
        // FightDataMgr.init();
        // fightDataMgr.parse(report,FightData);
        // 事件派发器
        FightEventMgr.init();
        // 回合控制器
        FightController.init();
        // 战斗播放器
        // FightPlayer.init();
        // action管理器
        FightActionMgr.init(this);
        // 飘血管理器
        // FightBloodMgr.init(this);
    }

    private _initBg() {
        
    }

    private _loadMainWorld() {
        this._fightMainWorld = new FightMainWorld();
        this._fightMainWorld.init();
        this.content.addChild(this._fightMainWorld);
    }

    private _loadMainUI() {
        resources.load("fight/prefabs/ui/fightmainui",Prefab,(err:Error,data:Prefab)=>{
            let uiNode = instantiate(data);
            this.content.addChild(uiNode);
        })
    }

    private _addListeners() {
        // fightEventMgr.addEventListener(FightConstant.macro.FightEvent.Game_Star,this._startGame.bind(this));
    }
 
    /**
     * @return FightMainWorld
     */
    public getFightMainWorld():FightMainWorld {
        return this._fightMainWorld;
    }

    update (deltaTime: number) {
     
    }

    onDestroy(){
        // fightDataMgr.destory();
        fightEventMgr.destory();
        fightController.destory();
        // fightPlayer.destory();
        fightActionMgr.destory();
        // fightBloodMgr.destory();
    }
}