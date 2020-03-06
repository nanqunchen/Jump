const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    
    @property(cc.Node)
    canvas: cc.Node = null;

    @property(cc.Node)
    lead: cc.Node = null;

    @property(cc.Node)
    ground: cc.Node = null;

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property(cc.Node)
    restartButton: cc.Node = null;
    
    private record: number = 0;
    private score: number = -1;

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this.lead.getComponent('Lead').init(this.canvas, this);
        this.ground.getComponent('Map').init(this.canvas, this.lead);
        this.restartButton.on(cc.Node.EventType.TOUCH_START, this.restart);
    }

    getScore() {
        this.score += 1;
        this.scoreLabel.string = this.score.toString();
    }
    
    end() {
        cc.director.pause();
        this.restartButton.active = true;
    }

    restart() {
        cc.director.loadScene('game');
        cc.director.resume();
    }
 
}
