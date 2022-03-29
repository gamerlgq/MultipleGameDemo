import { Component, error, log, Node, UITransform } from "cc";
import { UIWidget } from "./fight/components/UIWidget";
import { FightConstant } from "./fight/define/FightConstant";
import { RoleLayer } from "./fight/layer/RoleLayer";
import { TopEffectLayer } from "./fight/layer/TopEffectLayer";

export class FightMainWorld extends Node{
    
    // 层级管理
    private _layerMap:Map<number,Node> = new Map<number,Node>();

    private _roleLayer:RoleLayer = null;

    private _topEffectLayer:TopEffectLayer = null;

    /**
     * @description 初始化
     */
    public init() {
        this.addComponent(UITransform);
        this.addComponent(UIWidget);
        this._initLayers();
        this._addLayers();
    }

    private _initLayers() {
        this._layerMap.set(FightConstant.macro.FightLayer.BOTTM_EFFECT,this._createNode("BOTTM_EFFECT")); //底层特效层
        this._layerMap.set(FightConstant.macro.FightLayer.ROLE,this._createNode("ROLE")); //角色层
        this._layerMap.set(FightConstant.macro.FightLayer.TOP_EFFECT,this._createNode("TOP_EFFECT")); //上层特效层
        // this._layerMap.set(FightConstant.macro.FightLayer.BLOOD,this._createNode("BLOOD")); //数字层
        this._layerMap.set(FightConstant.macro.FightLayer.DIALOG,this._createNode("Dailog")); //对话层
    }

    private _createNode(name:string):Node {
        let node = new Node();
        node.name = name;
        node.addComponent(UITransform);
        node.addComponent(UIWidget);
        this.addChild(node);
        return node
    }

    private async _addLayers() {
        // 角色
        this._roleLayer = this.addCommonentInLayer(FightConstant.macro.FightLayer.ROLE, RoleLayer);
        this._roleLayer.init();

        // 上册技能层
        this._topEffectLayer = this.addCommonentInLayer(FightConstant.macro.FightLayer.TOP_EFFECT, TopEffectLayer);
        this._topEffectLayer.init();
    }

    /**
     * game start
     */
    public startGame() {
        this._roleLayer.startGame();
    }

    /**
     * tick
     */
    public tick(dt:number) {
        
    }

    /**
     * @description 根据层索引返回层节点
     * @param index:number 层索引
     * @return Node | null
     */
    public getLayer(index:number):Node | null {
        if (!this._layerMap.get(index)){
            error("There is not exist layer in FightMainWorld! index:[ %s ]",index.toString());
            return null;
        }
        return this._layerMap.get(index);
    }

    /**
     * 
     * @param layerName string 层级名称
     * @return Node | null
     */
    public getLayerByName(layerName:string):Node | null {
        return this.getChildByName(layerName);
    }

    /**
     * @description 根据层索引往层中添加节点
     * @param index 层索引
     * @param node  需要添加的节点
     * @param siblingIndex? 设置当前节点在父节点的 children 数组中的位置。
     */
    public insertChildInLayer(index:number,child:Node,siblingIndex?:number) {
        let layer = this.getLayer(index);
        if (layer) {
            layer.addChild(child);
            layer.setSiblingIndex(siblingIndex);
        }
    }

      /**
     * @description 根据层索引往层中添加组件
     * @param index 层索引
     * @param com  组件
     */
    public addCommonentInLayer<T extends typeof Component>(index:number,com:T):InstanceType<T> {
        let layer = this.getLayer(index);
        if (layer) {
            return layer.addComponent(com) as InstanceType<T>;
        }
    }


    /**
     * @description 根据层索引往层中添加组件
     * @param index 层索引
     * @param com  组件
     */
    public getCommonentInLayer<T extends typeof Component>(index:number,com:T):InstanceType<T> {
        let layer = this.getLayer(index);
        if (layer) {
            let comp = layer.getComponent(com);
            return comp as InstanceType<T>;
        }
    }
}