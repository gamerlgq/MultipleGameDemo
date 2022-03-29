/*
 * @Author: liuguoqing
 * @Date: 2022-03-19 11:17:19
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 16:41:48
 * @Description: file content
 */

import { _decorator,Node, Prefab, instantiate, Vec3, log, resources, error, Component } from 'cc';
import { FightConstant } from '../fight/define/FightConstant';
import { SpineComponentBase } from './SpineComponentBase';

const { ccclass } = _decorator;
@ccclass
export class SpineNodeBase extends Node {
    // 阵营
    private _camp:number;
        
    public get camp() : number {
        return this._camp
    }
    
    public set camp(v : number) {
        this._camp = v;
    }
    
    private _spineCom:SpineComponentBase = null; 

    public get spineCom() :SpineComponentBase {
        return this._spineCom
    }
    
    constructor(spineNode:Node){
        super();
        this.addChild(spineNode);
        this._spineCom = this.getComponentInChildren(SpineComponentBase);
    }

    /**
     * @description 立即播放当前动画
     * @param actionName spine 动作名称
     * @param isLoop 是否循环播放 默认值false
    */
    public play(actionName:string,isLoop?:boolean){
        this._spineCom.play(actionName,isLoop);
    }
    /**
     * @description 添加特效在角色身上
     */
    public addEffectFont(node:Node,offset?:Vec3) {
        this._spineCom.addEffectFont(node,offset);
    }

    /**
     * @description 添加特效在角色脚上
     */
    public addEffectBack(node:Node,offset?:Vec3){
        this._spineCom.addEffectBack(node,offset);
    }

    /**
     * addBloodUI
     */
    public addBloodUI(path?:string) {
        path??="fight/prefabs/ui/hero_blood_ui";
        resources.load(path, Prefab, (err, dataAsset) => {
            if (err) {
                error("ResourcesLoader load error:",err.message);
            }
            let node = instantiate(dataAsset);
            this._spineCom.addBloodUI(node);
        });  
    }

    /**
     * updateBlood
     */
    public updateBlood(cur:number,top:number) {
        this._spineCom.updateBlood(cur,top);
    }

    /**
     * @description 换皮肤
     * @param skinName:number 皮肤id
     */
    public changeSkin(skinName:string) {
        this._spineCom.changeSkin(skinName);
    }

    /**
     * 
     * @description 更换皮肤的单间装备
     * @param skinName 新皮肤名字（装备所在的皮肤）
     * @param oldSlotName 旧插槽的名字
     * @param newSlotName 新插槽的名字
     */
    public changeEquip(skinName:string,oldSlotName:string,newSlotName:string){
        this._spineCom.changeEquip(skinName,oldSlotName,newSlotName);
    }

    /** 动画开始回调 */
    public setAnimateStartCallback(callback:FightConstant.interfaces.SpineTrackEntryCallFunc) {
        this._spineCom.setAnimateStartCallback(callback);
    }

    /** 动画结束回调 */
    public setAnimateEndCallback(callback: FightConstant.interfaces.SpineTrackEntryCallFunc) {
        this._spineCom.setAnimateEndCallback(callback);
    }

    /** 动画被打断回调 */
    public setAnimateInterruptCallback(callback: FightConstant.interfaces.SpineTrackEntryCallFunc) {
        this._spineCom.setAnimateInterruptCallback(callback);
    }

    /** 动画事件回调 */
    public setAnimateEventCallback(callback:FightConstant.interfaces.SpineFrameEventCallFunc) {
        this._spineCom.setAnimateEventCallback(callback);
    }

    /**
     * setSkillCallback
     */
    public setSkillCallback(callback:Function) {
        this._spineCom.setSkillCallback(callback);
    }

    /**
     * getSkillPos
     */
    public getSkillPos():Vec3 {
        return this._spineCom.getSkillPos();
    }
}

// 武将
export class HeroSpineNode extends SpineNodeBase {
}
// 敌方
export class MonsterSpineNode extends SpineNodeBase {
}