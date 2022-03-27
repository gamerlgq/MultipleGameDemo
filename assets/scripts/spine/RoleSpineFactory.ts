/**
 * 生产角色spine工厂方法
 */

 import { Asset, error, instantiate, Node, Prefab, resources } from "cc";
//  import { viewRegisterMgr } from "../../../define/ViewRegisterMgr";
 import { HeroSpineNode, MonsterSpineNode, SpineNodeBase } from "./SpineNodeBase";
 
 // 工厂方法
 const factory = <T extends typeof SpineNodeBase>(cls: T, node:Node) =>
     new cls(node) as InstanceType<T>;
 
 export class RoleSpineFactory {
     /**
      * 
      * @param cls 类型 HeroSpineNode or MonsterSpineNode 继承SpineNodeBase
      * @param id number
      * @returns 异步函数
      * @example 
      * onLoad(){
      *    this._loadAttackers();
      * }
      * 
      * private async _loadAttackers(){
      *     let node = await RoleSpineFactory.create(HeroSpineNode,heroId);  
      *     this.node.addChild(node); 
      * }
      */
     public static async create<T extends typeof SpineNodeBase>(cls:T,id:number){
         let node = await RoleSpineFactory._loadPromise(id);
         return factory(cls,node);        
     }
 
     private static async _loadPromise(id:number):Promise<Node>{
         let file = "role/prefabs/hero_" + id.toString();
         let prefab:Prefab = await this._load(file,Prefab);
         let spineNode = instantiate(prefab);
         return spineNode;
     }

     private static _load<T extends Asset>(path: string, type?:typeof Asset): Promise<T> {
        return new Promise<T>((resolve, rejected)=>{
            resources.load(path,type,(err:Error,dataAsset:T)=>{
                if (err) {
                    error("ResourcesLoader load error:",err.message);
                    return rejected(err);
                }
                resolve(dataAsset);
            })
        })
     }


 }