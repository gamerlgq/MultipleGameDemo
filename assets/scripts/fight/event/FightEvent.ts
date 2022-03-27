/*
 * @Author: liuguoqing
 * @Date: 2022-03-19 11:17:19
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-19 13:33:45
 * @Description: file content
 */
/**
 * @description 战斗事件
 */
export class FightEvent {
    private _eventId:number;
    private _data:any;

    constructor(eventId:number,data:any) {
        this._eventId = eventId;
        this._data = data;
    }

    /**
     * getEventId
     */
    public getEventId() {
        return this._eventId;
    }

    public getEventData(){
        return this._data;
    }
}