import { Animation, log, Node, sp, UITransform, Vec3 } from "cc";
import { HeroSpineNode, MonsterSpineNode } from "../../spine/SpineNodeBase";
import { FightConstant } from "../define/FightConstant";
import { EffectBase } from "../effect/EffectBase";
import { FireBall } from "../effect/FireBall";
import { RoleLayer } from "../layer/RoleLayer";
import { TopEffectLayer } from "../layer/TopEffectLayer";
import { ActionBase } from "./ActionBase";

export class ActionSkill extends ActionBase{
    
    static start(data:FightConstant.interfaces.ActionSkill<HeroSpineNode| MonsterSpineNode>){
        let own = data.Own;
        if (!own){
            own = ActionSkill._getMonster();
        }

        let tars = [];
        if (!data.Tar){
            tars = ActionSkill._getHeros();
        }

        own.setSkillCallback((args:any)=>{
            const ownPos = ActionSkill._getOwnPos(own);
            const topEffectLayer = ActionSkill._fightMainWorld.getCommonentInLayer(FightConstant.macro.FightLayer.TOP_EFFECT,TopEffectLayer);
        
            tars.forEach(tar => {
                const tarPos = ActionSkill._getTargetPos(tar);
                topEffectLayer.play(this._getEffectCtor(data.Id),ownPos,tarPos,data.Duration);
            });
            
        })
        
        let animation = own.spineCom.getComponent(Animation);
        let clips = animation.clips;
        for (let index = 0; index < clips.length; index++) {
            const clip = clips[index];
            if (clip.name == "hero_"+own.spineCom.id+"_skill"){
                animation.play(clip.name);
                break;
            }
        }
        own.play(ActionSkill._getAniamtionName(own,data.Animation),false);

        own.setAnimateEndCallback(()=>{
            let name = own.spineCom.id == FightConstant.macro.Camp.Attacker ? FightConstant.macro.HeroAnimate.back_die :
                                    FightConstant.macro.HeroAnimate.front_idle; 
            own.play(name,true);
        })
    };

    static _getTargetPos(tar:HeroSpineNode| MonsterSpineNode):Vec3{
        return ActionSkill._getPos(tar);
    }

    static _getOwnPos(own:HeroSpineNode| MonsterSpineNode):Vec3{   
        return own.getSkillPos(); 
    }

    static _getPos(node:Node):Vec3{
        let uiTransform = node.getComponent(UITransform);
        if (!uiTransform){
            uiTransform = node.getComponentInChildren(UITransform);
        }
        return uiTransform.convertToWorldSpaceAR(Vec3.ZERO);
    }

    static _getMonster():MonsterSpineNode{
        const roleLayer = ActionSkill._fightMainWorld.getCommonentInLayer(FightConstant.macro.FightLayer.ROLE,RoleLayer);
        return roleLayer.getMonster();
    }

    static _getHeros():HeroSpineNode[]{
        const roleLayer = ActionSkill._fightMainWorld.getCommonentInLayer(FightConstant.macro.FightLayer.ROLE,RoleLayer);
        return roleLayer.getAllHero();
    }

    static _getAniamtionName(own:HeroSpineNode|MonsterSpineNode,animation:string):string{
        let camp = own.camp;
        if (camp == FightConstant.macro.Camp.Attacker){
            return "back_" + animation;
        }else if(camp == FightConstant.macro.Camp.Defender){
            return "front_" + animation;
        }
    }

    static _getEffectCtor<T extends typeof EffectBase>(id:number):T {
        if (id == FightConstant.macro.FightEffect.FireBall) {
            return FireBall as T;
        }
    }

    static done(){

    };
}