
import { _decorator, Component, Node, ProgressBar, Label, js } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('FightBloodUI')
export class FightBloodUI extends Component {

    @property(ProgressBar)
    progressBar:ProgressBar = null;

    // @property(Label)
    // lblBlood:Label = null;

    updateBlood(cur:number,top:number){
        let percent = cur / top * 100;
        this.progressBar.progress = percent;
        // this.lblBlood.string = js.formatStr("%d/%d",cur,top);
    }
}
