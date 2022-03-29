import { error, log, Node,  tween, UITransform, Vec3 } from "cc";
import { BulletFactory } from "../effect/BulletFactory";
import { EffectBase } from "../effect/EffectBase";
import { FightLayerBase } from "./FightLayerBase";

export class TopEffectLayer extends FightLayerBase {

    private _actionNode:Node = null;

    private _isPlayerTween:boolean = false;

    public init(){
        this._actionNode = new Node();
        this.node.addChild(this._actionNode);
    }

    public popActionNode():Node{
        if (this._isPlayerTween){
            error("this._actionNode:isPlayerTween return null!")
            return null
        }
        this._isPlayerTween = true;
        return this._actionNode;
    }

    public pushActionNode(){
        this._isPlayerTween = false
    }

    public async play<T extends typeof EffectBase>(effectCtor:T,ownPos:Vec3,tarPos:Vec3,duration:number) {
        let effect = await this._getEffect(effectCtor);
        if (effect){
            this.node.addChild(effect)
            effect.position = this.node.getComponent(UITransform).convertToNodeSpaceAR(ownPos);
            tween(effect).to(duration,{
                position:this.node.getComponent(UITransform).convertToNodeSpaceAR(tarPos)
            }).call(()=>{
                BulletFactory.put(effect);
            }).start();
        }
    }

    private async _getEffect<T extends typeof EffectBase>(effectCtor:T):Promise<Node> {
        let effect:Node = await BulletFactory.get(effectCtor);
        return effect;
    }

    onDestroy(){
        BulletFactory.clear();
    }
}