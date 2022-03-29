import { EffectBase } from "./EffectBase";
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('FireBall')
export class FireBall extends EffectBase {
    static getPrefabPath():string{
        return "fight/prefabs/effect/fireball"
    }
}