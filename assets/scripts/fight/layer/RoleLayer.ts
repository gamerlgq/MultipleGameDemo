/*
 * @Author: liuguoqing
 * @Date: 2022-03-19 11:17:19
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 16:14:40
 * @Description: file content
 */
import { Component, error, js, Node, NodePool, v3, Vec3 } from "cc";
import { RoleSpineFactory } from "../../spine/RoleSpineFactory";
import { HeroSpineNode, MonsterSpineNode } from "../../spine/SpineNodeBase";
import { FightConstant } from "../define/FightConstant";
import { FightEvent } from "../event/FightEvent";
import { fightEventMgr } from "../event/FightEventMgr";
import { FightLayerBase } from "./FightLayerBase";

export class RoleLayer extends FightLayerBase {
  
    private _heroPool:NodePool = null;

    public init() {
        this._initListeners();
        this._heroPool = new NodePool();
    }

    private _initListeners() {
        fightEventMgr.addEventListener(FightConstant.macro.FightEvent.Game_Broadcast,this.onCreateRole.bind(this));
    }

    private onCreateRole(event:FightEvent) {
        const data = event.getEventData();
    }


    public async createRole(heroId:number,){
        if (! heroId){
            return error(js.formatStr("RoleLayer:createRole heroId undefined!"));
        }
        let node = await RoleSpineFactory.create(HeroSpineNode,heroId);
    }

    private async _loadAttackers(attackers:Array<FightFormationData>) {
        for (let index = 0; index < attackers.length; index++) {
            let attackInfo = attackers[index];
            let heroId = attackInfo.getHeroId();
            if (heroId == -1){
                return error(js.formatStr("RoleLayer:_loadAttackers heroId = -1 index:[%d]",index));
            }
      
            let node = await RoleSpineFactory.create(HeroSpineNode,heroId);
            this.node.addChild(node);
            this._setPosition(node,index,FightConstant.FightUnitType.Attack);
            this._attackRoleList.push(node);
            node.addBloodUI();
            node.setSiblingIndex(-1);
            node.formationIndex = index;
            node.camp = FightConstant.FightUnitType.Attack;
        }
    }

    private async _loadDefenders(defenders:Array<FightFormationData>){
        for (let index = 0; index < defenders.length; index++) {
            let defenderInfo = defenders[index];
            let heroId = defenderInfo.getHeroId();
            if (heroId == -1){
                return error(js.formatStr("RoleLayer:_loadDefenders heroId = -1 index:[%d]",index));
            }

            let node = await RoleSpineFactory.create(MonsterSpineNode,heroId);
            this.node.addChild(node);
            this._setPosition(node,index,FightConstant.FightUnitType.Defend);
            this._defendRoleList.push(node);
            node.setScale(v3(-1,1,1));
            node.changeSkin("2");
            node.addBloodUI();
            node.setSiblingIndex(-1)
            node.formationIndex = index;
            node.camp = FightConstant.FightUnitType.Defend;
        }
    }

    private _setPosition(node:HeroSpineNode,idx:number,camp:number) {
        let pos = this.getFomationPos(camp,idx);
        node.position = pos;
    }

    public startGame(){
        this._attackRoleList.forEach(element => {
            element.play(FightConstant.macro.HeroAnimate.Idle,true);
            element.changeEquip("2","dao2","dao2");
        });

        this._defendRoleList.forEach(element => {
            element.play(FightConstant.macro.HeroAnimate.Idle,true);
            element.changeEquip("2","dao2","dao2");
        });
    }

    public updateView(data) {
        
    }

    public getRoleAttacker(index:number):HeroSpineNode{
        return this._attackRoleList[index];
    }

     public getRoleDefender(index:number):MonsterSpineNode {
        return this._defendRoleList[index];
    }

    /**
     * 
     * @param idx number 阵型索引
     * @param camp number 所在阵营 
     */
    public getFomationPos(camp:number,idx:number):Vec3{
        let isAttacker:boolean = camp == FightConstant.FightUnitType.Attack;
        let com = this._mainWorld.getCommonentInLayer(FightConstant.FightLayer.FORMATION,FomationLayer);
        let pos = isAttacker? com.getAttackPosByIndex(idx) : com.getDefendPosByIndex(idx);
        return pos.clone();
    }
}