
import { _decorator, Component, Node, Label, log } from 'cc';
import { FightConstant } from './fight/define/FightConstant';
import { FightEvent } from './fight/event/FightEvent';
import { fightEventMgr } from './fight/event/FightEventMgr';
import { HeroSpineNode, MonsterSpineNode } from './spine/SpineNodeBase';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = FightMainUI
 * DateTime = Sat Mar 26 2022 14:29:04 GMT+0800 (中国标准时间)
 * Author = Steven_Greeard
 * FileBasename = FightMainUI.ts
 * FileBasenameNoExtension = FightMainUI
 * URL = db://assets/scripts/FightMainUI.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('FightMainUI')
export class FightMainUI extends Component {

    @property(Label)
    lblNums:Label = null

    private _roleNums:number = 0;

    start () {
        // [3]
        this._initListeners();
        this.lblNums.string = this._roleNums.toString();
    }

    private _initListeners() {
        fightEventMgr.addEventListener(FightConstant.macro.FightEvent.Game_Broadcast,this._onBroadcastHandler.bind(this));
    }

    private _onBroadcastHandler(event:FightEvent) {
        let data:FightConstant.interfaces.FightCmdData = event.getEventData();
        let cmd = data.Command;
        if (cmd == FightConstant.macro.FightConmand.Create) {
            this._roleNums += 1;
            this.lblNums.string = this._roleNums.toString();
        }
    }

    onCreateBtnClick(){
        let id = this._getRandomId();
        let data:FightConstant.interfaces.ActionCreate = {
            Id: id,
            Posititon: undefined
        }  

        let cmdData:FightConstant.interfaces.FightCmdData = {
            Command: FightConstant.macro.FightConmand.Create,
            data: data
        }
 
        fightEventMgr.send(new FightEvent(FightConstant.macro.FightEvent.Game_Broadcast,cmdData));
    }

    private _getRandomId():number {
        let random = Math.random() * 2;
        return Math.ceil(random);
    }

    onMoveBtnClick(){

    }

    onAttackBtnClick(){
        let id = this._getRandomId();
        let data:FightConstant.interfaces.ActionSpineAnimation = {
            Id: id,
            Animation: 'atk',
            Mode: 1,
            IsLoop: true
        }  

        let cmdData:FightConstant.interfaces.FightCmdData = {
            Command: FightConstant.macro.FightConmand.Attack,
            data: data
        }
 
        fightEventMgr.send(new FightEvent(FightConstant.macro.FightEvent.Game_Broadcast,cmdData));
    }

    onDieBtnClick(){
        
    }

    onIdleBtnClick(){
        let id = this._getRandomId();
        let data:FightConstant.interfaces.ActionSpineAnimation = {
            Id: id,
            Animation: 'idle',
            Mode: 1,
            IsLoop: true
        }  

        let cmdData:FightConstant.interfaces.FightCmdData = {
            Command: FightConstant.macro.FightConmand.Idle,
            data: data
        }
 
        fightEventMgr.send(new FightEvent(FightConstant.macro.FightEvent.Game_Broadcast,cmdData));
    }

    onSkillBtnClick(){
        let data:FightConstant.interfaces.ActionSkill<HeroSpineNode | MonsterSpineNode> = {
            Id: 0,
            Duration:1,
            Animation: 'skill',
            Own: undefined,
            Tar: undefined
        }  

        let cmdData:FightConstant.interfaces.FightCmdData = {
            Command: FightConstant.macro.FightConmand.Skill,
            data: data
        }
 
        fightEventMgr.send(new FightEvent(FightConstant.macro.FightEvent.Game_Broadcast,cmdData));
    }

    onHitBtnClick(){
        let id = this._getRandomId();
        let data:FightConstant.interfaces.ActionSpineAnimation = {
            Id: id,
            Animation: 'hit',
            Mode: 1,
            IsLoop: true
        }  

        let cmdData:FightConstant.interfaces.FightCmdData = {
            Command: FightConstant.macro.FightConmand.Hit,
            data: data
        }
 
        fightEventMgr.send(new FightEvent(FightConstant.macro.FightEvent.Game_Broadcast,cmdData));
    }
}