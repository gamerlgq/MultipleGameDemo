import { log, math, Vec3, view } from "cc";
import { HeroSpineNode, MonsterSpineNode } from "../../spine/SpineNodeBase";
import { FightConstant } from "../define/FightConstant";
import { RoleLayer } from "../layer/RoleLayer";
import { ActionBase } from "./ActionBase";

export class ActionSpineAnimation extends ActionBase {

    static start(data:FightConstant.interfaces.ActionSpineAnimation): void {
        const roleLayer = ActionSpineAnimation._fightMainWorld.getCommonentInLayer(FightConstant.macro.FightLayer.ROLE,RoleLayer);
        let mode = data.Mode;
        if (mode == 0){
            ActionSpineAnimation._playOneRoleAnimation(roleLayer,data);
        }else{
            ActionSpineAnimation._playAllRoleAnimation(roleLayer,data);
        }
    }

    static _playOneRoleAnimation(roleLayer:RoleLayer,data:FightConstant.interfaces.ActionSpineAnimation){
        let role:HeroSpineNode | MonsterSpineNode = null;
        if (data.Id > 1){
            role = roleLayer.getMonster() as unknown as MonsterSpineNode;
        }else{
            role = roleLayer.getHero() as unknown as HeroSpineNode;
        }
        role.play(this._getAnimationName(data),data.IsLoop);
    }

    static _playAllRoleAnimation(roleLayer:RoleLayer,data:FightConstant.interfaces.ActionSpineAnimation){
        let roles:Array<HeroSpineNode | MonsterSpineNode> = null;
        if (data.Id > 1){
            roles = roleLayer.getAllMonster() as unknown as Array<MonsterSpineNode>;
        }else{
            roles = roleLayer.getAllHero() as unknown as Array<HeroSpineNode>;
        }

        roles.forEach(role => {
            role.play(this._getAnimationName(data),data.IsLoop); 
        });
    }

    static _getAnimationName(data:FightConstant.interfaces.ActionSpineAnimation){
        if (data.Id > 1){
            return "front_" + data.Animation;
        }else{
            return "back_" + data.Animation;
        }
    }

    static done(): void {
        
    }

}