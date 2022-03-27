
import { _decorator, Component, Node, Label } from 'cc';
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

    start () {
        // [3]
    }

    onCreateBtnClick(){

    }

    onMoveBtnClick(){

    }

    onAttackBtnClick(){

    }

    onDieBtnClick(){
        
    }

    onIdleBtnClick(){

    }

    onSkillBtnClick(){
        
    }
}