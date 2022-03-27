
import { _decorator, Component, Node, resources, Prefab, Asset, instantiate } from 'cc';
import { FightMainWrold } from './FightMainWrold';
const { ccclass, property } = _decorator;
 
@ccclass('FightMainView')
export class FightMainView extends Component {
    
    @property(Node)
    content:Node = null;

    private _fightMainWorld:Node = null;

    /**
    * @description 初始化
    */
    public init(report:JsonAsset) {
        this._initManagers(report);
        this._initBg();
        this._loadMainWorld();
        this._loadMainUI();
        this._addListeners();
    }

    private _initManagers(report:JsonAsset) {
        // 战报数据管理器
        FightDataMgr.init();
        fightDataMgr.parse(report,FightData);
        // 事件派发器
        FightEventMgr.init();
        // 回合控制器
        FightController.init();
        // 战斗播放器
        FightPlayer.init();
        // action管理器
        FightActionMgr.init(this);
        // 飘血管理器
        FightBloodMgr.init(this);
    }

    private _initBg() {
        
    }

    private _loadMainWorld() {
        this._fightMainWorld = new FightMainWorld();
        this._fightMainWorld.init();
        this._content.addChild(this._fightMainWorld);
    }

    private _loadMainUI() {
        resources.load("fight/prefabs/ui/fightmainui",Prefab,(err:Error,data:Prefab)=>{
            let uiNode = instantiate(data);
            this.node.addChild(uiNode);
        })
    }

    private _addListeners() {
        fightEventMgr.addEventListener(FightConstant.FightEvent.Game_Star,this._startGame.bind(this));
    }

    start () {
        this._init();
    }

    private _init() {
        this._fightMainWorld = new FightMainWrold();
        this.content.addChild(this._fightMainWorld);
    }

    update (deltaTime: number) {
     
    }

    onDestroy(){
        fightDataMgr.destory();
        fightEventMgr.destory();
        fightController.destory();
        fightPlayer.destory();
        fightActionMgr.destory();
        fightBloodMgr.destory();
    }
}