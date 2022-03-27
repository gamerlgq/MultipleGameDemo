export interface ActionBase {
    
    start(...args:any):void;

    done():void;
}