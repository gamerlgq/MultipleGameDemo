
import { _decorator, Component, Widget, widgetManager, Node, find, log } from 'cc';
const { ccclass } = _decorator;
 
@ccclass('UIWidget')
export class UIWidget extends Component {
  
    private _root:Node;

    start () {
        this._root = this.node.parent;
        //全屏
        let widget = this.node.addComponent(Widget);
        let canvas = find("Canvas");
        widget!.alignFlags = widgetManager.AlignFlags.HORIZONTAL | widgetManager.AlignFlags.VERTICAL;
        widget!.left = 0;
        widget!.right = 0;
        widget!.bottom = 0;
        widget!.top = 0;
        widget!.target = canvas
    }


}