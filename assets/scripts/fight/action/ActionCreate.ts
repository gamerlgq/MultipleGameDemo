import { RoleSpineFactory } from "../../spine/RoleSpineFactory";
import { HeroSpineNode, MonsterSpineNode } from "../../spine/SpineNodeBase";
import { ActionBase } from "./ActionBase";

export class ActionCreate implements ActionBase {


    start(id:number): void {
        // const _t = id == 1 ? HeroSpineNode : MonsterSpineNode;
        // let hero = RoleSpineFactory.create(_t,id);
        // return hero;
    }

    done(): void {
        throw new Error("Method not implemented.");
    }

}