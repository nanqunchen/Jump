const {ccclass, property} = cc._decorator;

// 角色动画状态机
enum ROLESTATE {
    WALK = 'walk_right',
    JUMP = 'jump',
    STAND = 'stand',
    SHAKE = 'shake',
    DROP = 'drop'
}

@ccclass
export default class Lead extends cc.Component {
    
    @property(cc.Node)
    lead: cc.Node = null;

    @property
    jumpStep: number = null;

    private gameInstant: cc.Component = null;
    // 皮肤管理
    // TODO
    private skin: cc.SpriteFrame = null;
    
    // 动画状态管理
    // TODO
    private currState: ROLESTATE = null;
    private anim: cc.Animation = null;

    // 游戏画板动作管理
    private touchpad: cc.Node = null;

    // 着陆块
    private land: cc.BoxCollider = null;
    
    // 代替 onLoad 方法
    init(touchpad: cc.Node, game: cc.Component) {
        this.gameInstant = game;
        this.anim = this.lead.getComponent(cc.Animation);
        this.touchpad = touchpad;
        this.touchpad.on(cc.Node.EventType.TOUCH_START, () => {this.act(ROLESTATE.JUMP)}, this);
        this.act(ROLESTATE.WALK);
    }

    start() {
        this.loadSkin('');
    }

    onDestroy() {
        this.touchpad.off(cc.Node.EventType.TOUCH_START, () => {this.act(ROLESTATE.JUMP)}, this);
    }

    loadSkin(skin: string) {
        // load the skin configs
    }

    act(state: ROLESTATE) {
        switch(state) {
            case this.currState:
                // 重复表演当前状态时，不执行任何动画
                break;
            case ROLESTATE.WALK:
                this.currState = ROLESTATE.WALK;
                this.anim.play(ROLESTATE.WALK);
                break;
            case ROLESTATE.JUMP:
                if(this.currState === ROLESTATE.DROP){
                    break;
                }else {
                    this.currState = ROLESTATE.JUMP;
                    this.anim.play(ROLESTATE.JUMP);
                    this.lead.runAction(cc.sequence(
                        cc.jumpTo(.6, cc.v2(this.lead.x, this.lead.y + 100), 150, 1),
                        cc.moveTo(.1, cc.v2(this.lead.x, this.lead.y)),
                        cc.callFunc(() => {
                            this.act(ROLESTATE.DROP)
                        }, this)
                    ));
                    break;
                }
            case ROLESTATE.SHAKE:
                break;
            case ROLESTATE.DROP:
                this.currState = ROLESTATE.DROP;
                // TODO 新的动画
                // this.anim.play(ROLESTATE.DROP)
                this.anim.stop();
                // TODO 跑步继续，跳跃的话播放最后一针
                this.lead.runAction(
                    cc.moveBy(.7, cc.v2(0, -500))
                )
                break;
            case ROLESTATE.STAND:
                break;
        }
    }

    update() {
        if (this.land){
            if (this.currState != ROLESTATE.JUMP){
                if(this.land.world.aabb.xMax < 
                    this.lead.convertToWorldSpaceAR(cc.Vec2.ZERO).x) {
                    this.act(ROLESTATE.DROP);
                }
            }
        } 
    }

    onCollisionEnter (other: cc.BoxCollider, self: cc.BoxCollider) {
        this.land = other;
        if(other.world.aabb.yMax > self.world.aabb.yMin + 20) {
            this.gameInstant.end();
        }else {
            this.lead.stopAllActions();
            this.act(ROLESTATE.WALK);
            this.lead.y += other.world.aabb.yMax - self.world.aabb.yMin;
            this.gameInstant.getScore();
        }
    }

}
