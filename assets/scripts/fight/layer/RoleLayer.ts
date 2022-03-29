/*
 * @Author: liuguoqing
 * @Date: 2022-03-19 11:17:19
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 16:14:40
 * @Description: file content
 */
import { error, js, log, UITransform, Vec3 } from "cc";
import { RoleSpineFactory } from "../../spine/RoleSpineFactory";
import { HeroSpineNode, MonsterSpineNode } from "../../spine/SpineNodeBase";
import { FightConstant } from "../define/FightConstant";
import { FightEvent } from "../event/FightEvent";
import { fightEventMgr } from "../event/FightEventMgr";
import { FightLayerBase } from "./FightLayerBase";


export class RoleLayer extends FightLayerBase {
  
    private _heroPool:Array<HeroSpineNode> = null;
    private _monsterPool:Array<MonsterSpineNode> = null;

    public init() {
        // this._initListeners();
        this._heroPool = new Array<HeroSpineNode>();
        this._monsterPool = new Array<MonsterSpineNode>();
    }

    // private _initListeners() {
    //     fightEventMgr.addEventListener(FightConstant.macro.FightEvent.Game_Broadcast,this.onCreateRole.bind(this));
    // }

    // private onCreateRole(event:FightEvent) {
    //     const data = event.getEventData();
    // }


    public async createRole(heroId:number,pos:Vec3){
        if (!heroId){
            return error(js.formatStr("RoleLayer:createRole heroId undefined!"));
        }

        let n:MonsterSpineNode|HeroSpineNode  = null

        if (heroId > 1) {
            n = await RoleSpineFactory.create(MonsterSpineNode,heroId);
            n.camp = FightConstant.macro.Camp.Defender;
            this._monsterPool.push(n);
        }else{
            n = await RoleSpineFactory.create(HeroSpineNode,heroId);
            n.camp = FightConstant.macro.Camp.Attacker;
            this._heroPool.push(n);
        }

        n.setScale(new Vec3(0.5,0.5,1));
        this.node.addChild(n);
        n.position = this.node.getComponent(UITransform).convertToNodeSpaceAR(pos);
        if (heroId > 1) {
            n.play(FightConstant.macro.HeroAnimate.front_idle,true);
        }else{
            n.play(FightConstant.macro.HeroAnimate.back_idle,true);
        }
    }

    public startGame(){
    }

    public updateView(data) {
        
    } 

    /**
     * getHero
     */
    public getHero():HeroSpineNode {
        let random = Math.random() * this._heroPool.length;
        let idx = random - 1 ;
        idx = Math.min(0,idx);
        idx = Math.max(idx,this._heroPool.length-1);
        return this._heroPool[idx];
    }

    /**
     * getHeroByIndex
     */
    public getAllHero():Array<HeroSpineNode> {
       return this._heroPool;
    }

    /**
     * getHero
     */
    public getMonster():MonsterSpineNode {
        let random = Math.random() * this._monsterPool.length;
        let idx = random - 1 ;
        idx = Math.min(0,idx);
        idx = Math.max(idx,this._monsterPool.length-1);
        return this._monsterPool[idx];
    }
    
    /**
     * getHeroByIndex
     */
    public getAllMonster():Array<MonsterSpineNode> {
        return this._monsterPool;
    }
}