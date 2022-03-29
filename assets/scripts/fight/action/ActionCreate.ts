import { log, math, Vec3, view } from "cc";
import { HeroSpineNode, MonsterSpineNode } from "../../spine/SpineNodeBase";
import { FightConstant } from "../define/FightConstant";
import { RoleLayer } from "../layer/RoleLayer";
import { ActionBase } from "./ActionBase";

export class ActionCreate extends ActionBase {

    static start(data:FightConstant.interfaces.ActionCreate): void {
        const roleLayer = ActionCreate._fightMainWorld.getCommonentInLayer(FightConstant.macro.FightLayer.ROLE,RoleLayer);
        let pos = data.Posititon;
        if (!pos){
            pos = ActionCreate._getRandomPosition(data.Id);
        }
        roleLayer.createRole(data.Id,pos);
    }

    static _getRandomPosition(id:number):Vec3{
        let rd_x = Math.random();
        let rd_y = Math.random();
        let pos_x = rd_x * view.getDesignResolutionSize().width;
        pos_x = Math.min(pos_x,view.getDesignResolutionSize().width);
        let pos_y = rd_y * view.getDesignResolutionSize().height;
        if (id > 1){
            pos_y = pos_y < view.getDesignResolutionSize().height/2 ? view.getDesignResolutionSize().height + 10 : pos_y;
        }else{
            pos_y = pos_y > view.getDesignResolutionSize().height/2 ? view.getDesignResolutionSize().height/2 - 10 : pos_y;
        }

        pos_y = Math.min(pos_y,view.getDesignResolutionSize().height);
        let pos = new Vec3(pos_x,pos_y,0);
        return pos
    }

    static done(): void {
        
    }

}