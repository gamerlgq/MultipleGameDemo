import { Component, instantiate, log, Node, NodePool, Prefab, resources } from "cc";
import { EffectBase } from "./EffectBase";

export class NodePoolHandlerCom extends Component{

    unuse():void {
        this.node.active = false;
    };

    reuse(args: any):void{
        this.node.active = true;
    };
}

export class BulletFactory {

    static _bulletNodePool:NodePool = new NodePool(NodePoolHandlerCom);
    
    static async get<T extends typeof EffectBase>(bulletCtor:T):Promise<Node>{
        let effect:Node = null;
        for (let index = 0; index < BulletFactory._bulletNodePool.size(); index++) {
            const ef = BulletFactory._bulletNodePool.get();
            if (ef.getComponent(bulletCtor)){
                effect = ef;
                break;
            }
        }

        if (!effect){
            let path = bulletCtor.getPrefabPath();
            return await BulletFactory._loadPromis(path);
        }else{
            return effect;
        }
    }

    static clear(){
        for (let index = 0; index < BulletFactory._bulletNodePool.size(); index++) {
            const ef = BulletFactory._bulletNodePool.get();
            ef.destroy();
        }
    }

    static put(node:Node){
        BulletFactory._bulletNodePool.put(node);
    }

    static async _loadPromis(path:string):Promise<Node> {
        return new Promise<Node>((resolve, reject) => {
            resources.load(path,Prefab,(err:Error,prefab:Prefab)=>{
                if (err){
                    reject(err);
                }
                let effect = instantiate(prefab);
                effect.addComponent(NodePoolHandlerCom);
                resolve(effect);
            })
        }) 
    }
}